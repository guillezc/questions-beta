import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

//declare var ParticipantJS: any;
//import  'app/js/participants.js';

@Component({
	selector: 'q-dashboard',
	templateUrl: 'app/templates/dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy{
	speakers: FirebaseListObservable<any[]>;
	votes: FirebaseListObservable<any[]>;
	surveys: FirebaseListObservable<any[]>;
	contacts: FirebaseListObservable<any[]>;
	messages: FirebaseListObservable<any[]>;
	speakersTotal: any;
	votesTotal: any;
	surveysTotal: any;
	contactsTotal: any;
	messagesTotal: any;
	speakSubs: any;
	isLoaded: boolean = false;

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Participantes - México Cumbre de Negocios");
		this.getPeople();
		this.getSurveys();
		this.getContacts();
		this.getMessages();
	}

	getPeople(){
		this.speakers = this.af.database.list('people');
		this.speakers.subscribe(peopleData => {
			this.speakersTotal = peopleData.length;
		});
	}

	getSurveys(){
		this.votes = this.af.database.list('surveys', {
			query: {
		        orderByChild: 'type',
		        equalTo: 'v'
		    }
		});
		this.votes.subscribe(voteData => {
			this.votesTotal = voteData.length;
		});

		this.surveys = this.af.database.list('surveys', {
			query: {
		        orderByChild: 'type',
		        equalTo: 'e'
		    }
		});
		this.surveys.subscribe(surveysData => {
			this.surveysTotal = surveysData.length;
		});
	}

	getContacts(){
		this.contacts = this.af.database.list('contacts');
		this.contacts.subscribe(contactData => {
			this.contactsTotal = contactData.length;
		});
	}

	getMessages(){
		this.messages = this.af.database.list('messages');
		this.messages.subscribe(messagesData => {
			this.messagesTotal = messagesData.length;
		});
	}

	ngOnDestroy(){

	}
}