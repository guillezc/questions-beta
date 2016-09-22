import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Event }  from '../classes/event';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'q-events-add',
	templateUrl: 'app/templates/event-add.component.html'
})

export class EventsAddComponent implements OnInit{
	events: FirebaseListObservable<any[]>;
	eventList: Event[] = [];
	addObj: Event = new Event();
	sessions: FirebaseListObservable<any[]>;
	sessionItems: Array<any> = [];
	sessionSelect: Array<any> = [];
	eventItems: Array<any> = [];
  days: any[];

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Agregar Evento - México Cumbre de Negocios");
		this.initEvent();
		this.getDays();
		this.getSessions();
	}

	onSubmit(event: any){
		console.log(event);
		//this.events = this.af.database.list('/events');
    //const newID = this.events.push(event).key;
	}

	initEvent(){
		this.addObj.day = '';
		this.addObj.name = '';
	}

	getDays(){
		this.af.database.list('/events').subscribe(evts => {
			this.days = evts;
			evts.forEach((evt: any) => {
				this.eventItems[evt.day] = evt.$key;
			});
		});
	}

	getSessions(){
    this.sessions = this.af.database.list('sessions');
    this.sessions.subscribe(data => {
      this.sessionItems = this.setSessionItems(data);
    });
  }

  addSession(value:any):void {
  	this.sessionSelect[value.id] = value.id;
  }

  removeSession(value:any):void {
    delete this.sessionSelect[value.id];
  }

  setSessionItems(sessions: Session[]){

    let items: Array<any> = [];
    if(sessions.length>0){
      sessions.forEach((sesss: Session) => {
        items.push( {
          id  : sesss.$key,
          text: sesss.title
        });
      });
    }

    return items;
  }

}