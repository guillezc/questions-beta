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
  firebase: AngularFire;
  sessionList: Session[] = [];
  isLoaded: Boolean = false;

  constructor(
    private router         : Router,
    public af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {  
  	this.getSessions();
    this.setTitle("Sesiones - México Cumbre de Negocios");
  }

  getSessions(){
    this.sessions = this.af.database.list('sessions');
    this.sessions.subscribe(data => {
      this.sessionList = data;
      SessionJS.init();
      this.isLoaded = true;
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

}