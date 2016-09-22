import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Event }  from '../classes/event';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'q-events',
	templateUrl: 'app/templates/events.component.html'
})

export class EventsComponent implements OnInit{
	events: FirebaseListObservable<any[]>;
	eventList: Event[] = [];

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.getEvents();
		this.setTitle("Eventos - México Cumbre de Negocios");
	}

	getEvents(){
		this.events = this.af.database.list('/events');
		this.events.subscribe(data => {
			data.forEach((evt: Event) => {
				evt.sessions = [];
				for (var key in evt.sessionsId) {
			        this.af.database.object('/sessions/'+key).subscribe(sess => {
						evt.sessions.push(sess.title);
					});
			    }
			});
			this.eventList = data;
		});
	}

	addSpeaker(){
		let link = ['/evento/nuevo'];
		this.router.navigate(link);
	}

	editSpeaker(event: Event){
		let link = ['/evento/editar', event.$key];
		this.router.navigate(link);
	}

	deleteSpeaker(event: Event){
		this.af.database.object('/evento/'+event.$key).remove();
	}
}