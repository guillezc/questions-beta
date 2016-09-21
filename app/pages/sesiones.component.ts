import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { Session }  from '../classes/session';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var SessionJS: any;
import  'app/js/sessions.js';

@Component({
  selector: 'q-sessions',
  templateUrl: 'app/templates/sessions.component.html'
})

export class SessionsComponent implements OnInit {

  sessions: FirebaseListObservable<any[]>;
  survey: FirebaseListObservable<any[]>;
  sessionList: Session[] = [];
  isLoaded: Boolean = false;
  events: any[];
  eventItems: Array<any> = [];

  constructor(
    private router         : Router,
    public  af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {  
  	this.getSessions();
    this.setTitle("Sesiones - México Cumbre de Negocios");
    this.getEvents();
  }

  getSessions(){
    this.sessions = this.af.database.list('sessions');
    this.sessions.subscribe(data => {
      data.forEach((sess: any) => {
        this.survey = this.af.database.list('/surveys', {
          query: {
            orderByChild: 'sessionId',
            equalTo: sess.$key 
          }
        });
        this.survey.subscribe(srv => {
          sess.hasSurvey = (srv.length > 0) ? true : false; 
        });
      });
      this.sessionList = data;
      SessionJS.init();
      this.isLoaded = true;
    });
  }

  getEvents(){
    this.af.database.list('/events').subscribe(evts => {
      this.events = evts;
      evts.forEach((evt: any) => {
        this.eventItems[evt.day] = evt.$key;
      });
    });
  }

  addSession(){
    let link = ['/sesion/nueva'];
    this.router.navigate(link);
  }

  editSession(session: Session){
  	let link = ['/sesion/editar', session.$key];
    this.router.navigate(link);
  }

  deleteSession(session: Session){
  	this.af.database.object('/sessions/'+session.$key).remove();
  }

  filtraPorDias(day: any){
    this.isLoaded = false;
    SessionJS.destroyTable();
    if(day == '...'){
      this.getSessions();
    }else{
      this.sessions = this.af.database.list('sessions', {
        query: {
          orderByChild: 'eventId',
          equalTo: this.eventItems[day]
        }
      });
      this.sessions.subscribe(data => {
        data.forEach((sess: any) => {
          this.survey = this.af.database.list('/surveys', {
            query: {
              orderByChild: 'sessionId',
              equalTo: sess.$key 
            }
          });
          this.survey.subscribe(srv => {
            sess.hasSurvey = (srv.length > 0) ? true : false; 
          });
        });
        this.sessionList = data;
        SessionJS.init();
        this.isLoaded = true;
      });
    }
    
  }

  goToVotes(session: Session){
    let link = ['/votaciones/sesion', session.$key];
    this.router.navigate(link);
  }

}