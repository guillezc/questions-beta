import { Component, OnInit, OnDestroy } from '@angular/core';
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

export class ParticipantsComponent implements OnInit, OnDestroy{
	speakers: FirebaseListObservable<any[]>;
	speakersList: Speaker[] = [];
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
		this.getParticipants();
		this.setTitle("Participantes - México Cumbre de Negocios");
	}

	ngOnDestroy(){
		this.speakSubs.unsubscribe();
	}

	getParticipants(){
		this.speakers = this.af.database.list('people');
		this.speakSubs = this.speakers.subscribe(data => {

			var peopleArr: Speaker[] = [];
			var peopleSize = data.length;
			var counter = 0;
			data.forEach(speakerObj=>{
				this.af.database.object('peopleInfo/'+speakerObj.$key).subscribe(info=>{
					let speak: Speaker = new Speaker();
					speak.$key = info.$key;
					speak.bio = (info.spanishBio == undefined) ? "NA" : info.spanishBio;
					speak.name = (speakerObj.name == undefined || speakerObj.name == "") ? "NA" : speakerObj.name;
					speak.pic = speakerObj.pic;
					speak.title = speakerObj.title;

					peopleArr.push(speak);
					counter++;

					if(counter==peopleSize){
						this.speakersList = peopleArr;
						this.isLoaded = true;
						ParticipantJS.init();
					}
				});
			});
			
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
