import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

declare var VoteJS: any;
import  'app/js/votes.js';

@Component({
  selector: 'q-votes',
  templateUrl: 'app/templates/surveys.component.html',
  providers: [UserService]
})

export class SurveysComponent implements OnInit, OnDestroy {
  votes: FirebaseListObservable<any[]>;
  sessions: FirebaseListObservable<any[]>;
  surveyList: Survey[] = [];
  sessionList: any[] = [];
  isLoaded: Boolean = false;
  dayFilter: Date = new Date();

  datepickerOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
  };

  constructor(
    private userService : UserService,
    private router         : Router,
    public  af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getSurveys(){
  	this.votes = this.af.database.list('surveys', {
      query: {
        orderByChild: 'type',
        equalTo: 'e'
      }
    });  
    this.votes.subscribe(data => {
      this.surveyList = data;
      VoteJS.init();
      this.isLoaded = true;
    });	
  }

  ngOnInit() {
    this.userService.checkCredentials();
    this.setTitle("Votaciones - México Cumbre de Negocios");
  	this.getSurveys();
    this.sessions = this.af.database.list('sessions');
    this.sessions.subscribe(data=>{
      this.sessionList = data;
    });
  }

  ngOnDestroy(){
    VoteJS.destroyTable();
  }

  goToResults(srv: Survey) {
  	let link = ['/resultados/', srv.$key];
    this.router.navigate(link);
  }

  addSurvey(){
    let link = ['/encuesta/nueva'];
    this.router.navigate(link);
  }

  editSurvey(srv: Survey) {
  	let link = ['/encuesta/editar', srv.$key];
    this.router.navigate(link);
  }

  deleteSurvey(s: any) {
    this.af.database.list('/surveys').remove(s.$key);
    VoteJS.init();
  }
  
}