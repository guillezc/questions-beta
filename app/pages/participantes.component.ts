import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

declare var ParticipantJS: any;
import  'app/js/participants.js';

@Component({
	selector: 'q-participants',
	templateUrl: 'app/templates/participants.component.html'
})

export class ParticipantsComponent implements OnInit{
	speakers: FirebaseListObservable<any[]>;
	speakersList: Speaker[] = [];

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.getParticipants();
		this.setTitle("Participantes - México Cumbre de Negocios");
	}

	getParticipants(){
		this.speakers = this.af.database.list('people');
		this.speakers.subscribe(data => {
			this.speakersList = data;
			ParticipantJS.init();
		});
	}

	addSpeaker(){
		let link = ['/participante/nuevo'];
		this.router.navigate(link);
	}

	editSpeaker(speaker: Speaker){
		let link = ['/participante/editar', speaker.$key];
		this.router.navigate(link);
	}

		deleteSpeaker(speaker: Speaker){
		this.af.database.object('/people/'+speaker.$key).remove();
	}
}
