import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Session }  from '../classes/session';
import { Question }  from '../classes/question';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var QuestionsVar: any;
import  'app/js/questions.js';

@Component({
  selector: 'q-questions',
  templateUrl: 'app/templates/questions.component.html'
})

export class QuestionsComponent implements OnInit {
  questions: FirebaseListObservable<any[]>;
  filter: FirebaseObjectObservable<any>;
  sessions: FirebaseListObservable<any[]>;
  proyecteds: FirebaseListObservable<any[]>;

  questionsObj: Question = new Question();
  questionsListSelected: Question[] = [];
  questionsList: Question[] = [];
  firebase: AngularFire;
  isLoaded: Boolean = false;
  dayFilter: Date = new Date();

  datepickerOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
  };

  constructor(
    private router         : Router,
    public  af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getQuestions(){
  	this.questions = this.af.database.list('questions');
    this.questions.subscribe(data => {
      data.forEach((q: Question) => {
        this.af.database.object('/people/'+q.userId).subscribe(speakerData => {
          q.userName = speakerData.name;
        });
        this.af.database.object('/sessions/'+q.sessionId).subscribe(sessionData => {
          q.sessionName = sessionData.title.spanish;
        });
      });
      this.questionsList = data;
      this.isLoaded = true;
    });
  }

  getSessions(){
    this.sessions = this.af.database.list('sessions');
  }

  getSelecteds(){
    this.proyecteds = this.af.database.list('questions', {
      query: {
        orderByChild: 'selected',
        equalTo: true
      }
    });
    this.proyecteds.subscribe(data => {
      data.forEach((q: Question) => {
        this.af.database.object('/people/'+q.userId).subscribe(speakerData => {
          q.userName = speakerData.name;
        });
        this.af.database.object('/sessions/'+q.sessionId).subscribe(sessionData => {
          q.sessionName = sessionData.title.spanish;
        });
      });
      this.questionsListSelected = data;
      QuestionsVar.init();  
    });
  }

  ngOnInit() {
    this.setTitle("Preguntas - México Cumbre de Negocios");
  	this.getQuestions();
    this.getSelecteds();
    this.getSessions();
  }

  addToSelecteds(q: any){
    var id = q.$key;
    q.selected = true;
    delete q['$key'];
    delete q['userName'];
    delete q['sessionName'];
    delete q['$exists'];
    this.af.database.object('/questions/'+id).update(q);
  }

  removeToSelecteds(q: any){
    var id = q.$key;
    q.selected = false;
    delete q['$key'];
    delete q['userName'];
    delete q['sessionName'];
    delete q['$exists'];
    this.af.database.object('/questions/'+id).update(q);
  }

  removeAll(){
    this.questionsListSelected.forEach((q: Question) => {
      var id = q.$key;
      q.selected = false;
      delete q['$key'];
      delete q['userName'];
      delete q['sessionName'];
      this.af.database.object('/questions/'+id).update(q);
    });
  }

  goToProyecteds(){
    let link = ['/proyectar'];
    this.router.navigate(link);
  }

  handleDateFromChange(evt: Date){
    this.dayFilter = evt;
  }

  allQuestions(){
    this.filter = null;
    this.dayFilter = new Date();
    this.getQuestions();
  }

  filterQuestions(session: any){
    if(session.value != 'all'){

      let eDay: any = this.dayFilter .getUTCDate();
      let eMon: any = this.dayFilter .getMonth() + 1;
      let eYea: any = this.dayFilter .getFullYear();
      let sDate: Date = new Date(eYea+'-'+eMon+'-'+eDay+' 00:00:00');
      let eDate: Date = new Date(eYea+'-'+eMon+'-'+eDay+' 23:59:59');

      this.questions = this.af.database.list('questions', {
        query: {
          orderByChild: 'sessionId',
          equalTo: session.value
        }
      });
      this.questions.subscribe(data => {
        let qArray: Question[] = [];
        data.forEach((q: Question) => {
          this.af.database.object('/sessions/'+q.sessionId).subscribe(sessionData => {
            console.log(this.dayFilter + " <------> " + this.dayFilter.getTime());
            console.log(sessionData.startTime);
            console.log(sessionData.endTime);
            console.log("--------------");
            if(this.dayFilter.getTime() >= sessionData.startTime && this.dayFilter.getTime() <= sessionData.endTime){
              console.log("Question filtered!");
            }
            q.sessionName = sessionData.title.spanish;
            this.af.database.object('/people/'+q.userId).subscribe(speakerData => {
              q.userName = speakerData.name;
            });
          });
        });
        this.questionsList = data;
        this.filter = this.af.database.object('/sessions/'+session.value);
      });
    }else{
      this.getQuestions();
      this.filter = null;
    }
    
  }

}