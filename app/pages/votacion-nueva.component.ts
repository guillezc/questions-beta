import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

@Component({
  selector: 'q-vote-add',
  templateUrl: 'app/templates/vote-add.component.html'
})

export class VoteAddComponent implements OnInit {
  addObj: Survey = new Survey();
  sessions: FirebaseListObservable<any>;
  votes: FirebaseListObservable<any>;
  optionToAdd: any;
  options: any[] = [];

  constructor(
    private router         : Router,
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
    this.setTitle("Nueva Encuesta - México Cumbre de Negocios");
    this.initSurvey();
    this.getSessions();
    this.votes = this.af.database.list('/votes');
    //this.logger.log(this.addObj);
  }

  initSurvey(){
    this.addObj.sessionId = "...";
    this.addObj.session = [];
    this.addObj.question = "";
    this.addObj.options = [];

    this.optionToAdd = {"name": "", "voteId": false};
  }

  onSubmit(srv: any){
    delete srv["options"];
    const surveyID = this.af.database.list('/surveys').push(srv).key;
    this.options.forEach((opt: any) => {
      const voteID = this.votes.push({"users": false}).key;
      var optemp = {"name": opt.name, "voteId": voteID}
      this.af.database.list('/surveys/'+surveyID+"/options").push(optemp);
    });
    this.redirectToSessions();
  }

  addOption(){
    if(this.optionToAdd.name != ""){
      var optL = this.options.length;
      var opt = {"name": this.optionToAdd.name, "voteId": false};
      this.options[optL] = opt;
      this.optionToAdd.name = "";
    }
  }

  deleteOption(index: any){
    let opts: any[] = [];
    var count = 0;
    var key = 0;
    this.options.forEach((opt: any) => {
      if(count != index){
        opts[key] = opt;
        key++;
      }
      count++;
    });
    this.options = opts;
  }

  editOption(name: any, key: any){
    this.options[key]["name"] = name;
  }

  redirectToSessions(){
    let link = ['/votaciones'];
    this.router.navigate(link);
  }

}