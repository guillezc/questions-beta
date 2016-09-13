import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

@Component({
  selector: 'q-vote-add',
  templateUrl: 'app/templates/vote-edit.component.html'
})

export class VoteEditComponent implements OnInit {
  surveyObj: Survey = new Survey();
  sessions: FirebaseListObservable<any>;
  votes: FirebaseListObservable<any>;
  survey: FirebaseObjectObservable<any>;
  surveyID: any;
  optionToAdd: any;
  sub: any;

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    public  af        : AngularFire,
    private titleService   : Title) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getSessions(){
  	this.sessions = this.af.database.list('sessions');  
  }

  ngOnInit() {
    this.setTitle("Nueva Votación - México Cumbre de Negocios");
    this.getSessions();
    this.sub = this.route.params.subscribe(params => {
      this.surveyID = params['id'];
      this.getSurvey();
      this.votes = this.af.database.list('/votes');
    });
  }

  getSurvey(){
    this.survey = this.af.database.object('/surveys/'+this.surveyID);
    this.survey.subscribe(data => {
      this.af.database.object('/sessions/'+data.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          data.session = arr;
        });
      this.surveyObj = data;
    });
    this.optionToAdd = {"name": "", "voteId": false};
  }

  onSubmit(srv: any){
    delete srv["optionToAdd"];
    this.af.database.object('/surveys/'+this.surveyID).update(srv);
    this.redirectToSessions();
  }

  addOption(){
    if(this.optionToAdd.name != ""){
      const newID = this.votes.push({"users": false}).key;
      var optemp = {"name": this.optionToAdd.name, "voteId": newID};
      this.af.database.list('/surveys/'+this.surveyID+"/options").push(optemp);
      this.optionToAdd.name = "";
    }
  }

  deleteOption(opt: any){
    this.af.database.list('/surveys/'+this.surveyID+"/options").remove(opt.$key);
  }

  editOption(name: any, key: any){
    this.af.database.object('/surveys/'+this.surveyID+"/options/"+key).update({"name": name});
  }

  redirectToSessions(){
    let link = ['/votaciones'];
    this.router.navigate(link);
  }

}