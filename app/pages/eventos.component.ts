import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Event }  from '../classes/event';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

@Component({
	selector: 'q-events',
	templateUrl: 'app/templates/events.component.html',
	providers: [UserService]
})

export class EventsComponent implements OnInit{
	events: FirebaseListObservable<any[]>;
	eventList: Event[] = [];

	constructor(
		private userService  : UserService,
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

		this.userService.checkCredentials();
		this.getEvents();
		this.setTitle("Eventos - México Cumbre de Negocios");

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  

	}

	getEvents(){
		this.events = this.af.database.list('/events');
		this.events.subscribe(data => {
			data.forEach((evt: Event) => {
				evt.sessions = [];
				for (var key in evt.sessionsId) {
			        this.af.database.object('/sessions/'+key).subscribe(sess => {
						evt.sessions.push(sess.title.spanish);
					});
			    }
			});
			this.eventList = data;
		});
	}

	addEvent(){
		let link = ['/evento/nuevo'];
		this.router.navigate(link);
	}

	editEvent(event: Event){
		let link = ['/evento/editar', event.$key];
		this.router.navigate(link);
	}

	deleteEvent(event: Event){
		this.af.database.object('/events/'+event.$key).remove();
	}

}