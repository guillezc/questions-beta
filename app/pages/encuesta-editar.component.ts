import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from '../services/user.service';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

@Component({
  selector: 'q-survey-edit',
  templateUrl: 'app/templates/survey-edit.component.html',
  providers: [UserService]
})

export class SurveyEditComponent implements OnInit {
  surveyObj: Survey = new Survey();
  sessions: FirebaseListObservable<any>;
  votes: FirebaseListObservable<any>;
  survey: FirebaseObjectObservable<any>;
  surveyID: any;
  optionToAdd: any;
  sub: any;

  constructor(
    private userService : UserService,
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
    this.userService.checkCredentials();
    this.setTitle("Editar Encuesta - México Cumbre de Negocios");
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
      this.surveyObj.sessionId = "";
      this.surveyObj.question = [];
      this.surveyObj.question['spanish'] = data.question.spanish;
      this.surveyObj.question['english'] = data.question.english;
      this.surveyObj.options = data.options;
    });
    this.resetOptionsToAdd();
  }

  resetOptionsToAdd(){
    this.optionToAdd = {
      name: {
        spanish: "",
        english: ""
      }, 
      voteId: false
    };
  }

  onSubmit(srv: any){

    const vote_type = srv.votetype;

    srv.question = {spanish: srv.question_spanish, english: srv.question_english}
    srv.type = 'e';
    delete srv["question_spanish"];
    delete srv["question_english"];
    delete srv["optionToAddSpanish"];
    delete srv["optionToAddEnglish"];

    this.af.database.object('/surveys/'+this.surveyID).update(srv);
    this.redirectToSurveys();
  }

  addOption(){
    if(this.optionToAdd.name.spanish != "" && this.optionToAdd.name.english != ""){
      const newID = this.votes.push({empty: true}).key;
      var optemp = {
        name: {
          spanish: this.optionToAdd.name.spanish,
          english: this.optionToAdd.name.english
        }, 
        voteId: newID
      };
      this.af.database.list('/surveys/'+this.surveyID+"/options").push(optemp);
      this.resetOptionsToAdd();
    }else{
      alert('Ingrese el nombre de la opción');
    }
  }

  deleteOption(opt: any){
    this.af.database.list('/surveys/'+this.surveyID+"/options").remove(opt.$key);
  }

  editOption(nameES: any, nameEN: any, key: any){
    this.af.database.object('/surveys/'+this.surveyID+"/options/"+key).update({
      name: {
        spanish: nameES,
        english: nameEN
      }
    });
  }

  redirectToSurveys(){
    let link = ['/encuestas'];
    this.router.navigate(link);
  }

}