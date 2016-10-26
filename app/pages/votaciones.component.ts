import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

import { NKDatetime } from "ng2-datetime/ng2-datetime";

declare var VoteJS: any;
import  'app/js/votes.js';

@Component({
  selector: 'q-votes',
  templateUrl: 'app/templates/votes.component.html'
})

export class VotesComponent implements OnInit, OnDestroy {
  votes: FirebaseListObservable<any[]>;
  sessions: FirebaseListObservable<any[]>;
  surveyList: Survey[] = [];
  sessionList: any[] = [];
  isLoaded: Boolean = false;
  dayFilter: Date;

  datepickerOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    placeholder: 'Selecciona fecha'
  };

  constructor(
    private router         : Router,
    public  af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Votaciones - México Cumbre de Negocios");
    this.getSurveys();
    this.getSessions();
  }

  getSurveys(){
  	this.votes = this.af.database.list('surveys', {
      query: {
        orderByChild: 'type',
        equalTo: 'v'
      }
    });  
    this.votes.subscribe(data => {
      data.forEach((s: Survey) => {
        this.af.database.object('/sessions/'+s.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          s.session = arr;
        });
      });
      this.surveyList = data;
      VoteJS.init();
      this.isLoaded = true;
    });	
  }

  getSessions(){
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
    let link = ['/votacion/nueva'];
    this.router.navigate(link);
  }

  editSurvey(srv: Survey) {
  	let link = ['/votacion/editar', srv.$key];
    this.router.navigate(link);
  }

  deleteSurvey(s: any) {
    this.af.database.list('/surveys').remove(s.$key);
    VoteJS.init();
  }

  initDate(datepicker: NKDatetime){
    datepicker.onClearClick();
  }

  handleDateChange(evt: Date){
    this.dayFilter = evt;

    if(evt != null){
      let eDay: any = this.dayFilter.getUTCDate();
      let eMon: any = this.dayFilter.getMonth() + 1;
      let eYea: any = this.dayFilter.getFullYear();
      let sDate: Date = new Date(eYea+'-'+eMon+'-'+eDay+' 00:00:00');
      let eDate: Date = new Date(eYea+'-'+eMon+'-'+eDay+' 23:59:59');

      this.sessions = this.af.database.list('sessions', {
        query: {
          orderByChild: 'startTime',
          startAt: sDate.getTime(),
          endAt: eDate.getTime()
        }
      });
      this.sessions.subscribe(data=>{
        this.sessionList = data;
      });
    }else{
      this.getSessions();
    }
    
  }

  filterByArgs(sessionId: any){
    this.isLoaded = false;
    VoteJS.destroyTable();
    if(sessionId.value!=""){
      this.votes = this.af.database.list('surveys', {
        query: {
          orderByChild: 'sessionId',
          equalTo: sessionId.value
        }
      });  
      this.votes.subscribe(data => {
        data.forEach((s: Survey) => {
          this.af.database.object('/sessions/'+s.sessionId).subscribe(sessionData => {
            var arr: any[] = [];
            arr[0] = sessionData;
            s.session = arr;
          });
        });
        this.surveyList = data;
        VoteJS.init();
        this.isLoaded = true;
      });
    }else{
      this.surveyList = [];
      VoteJS.init();
      this.isLoaded = true;
    }
  }

}