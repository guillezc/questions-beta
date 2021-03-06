import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Sponsor }  from '../classes/sponsor';
import { Speaker }  from '../classes/speaker';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
	selector: 'q-sponsors',
	templateUrl: 'app/templates/sponsors.component.html'
})

export class SponsorsComponent implements OnInit{
	sponsors: FirebaseListObservable<any[]>;
	sponsorsList: Sponsor[] = [];
	storage: any;

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.storage = firebase.storage();
		this.getSponsors();
		this.setTitle("Patrocinadores - México Cumbre de Negocios");
	}

	getSponsors(){
		this.sponsors = this.af.database.list('sponsors');
		this.sponsors.subscribe(data => {
			this.sponsorsList = data;
		});
	}

	addSponsor(){
		let link = ['/patrocinador/nuevo'];
		this.router.navigate(link);
	}

	editSponsor(sponsor: Sponsor){
		let link = ['/patrocinador/editar', sponsor.$key];
		this.router.navigate(link);
	}

	deleteSponsor(sponsor: Sponsor){
		this.storage.ref().child('sponsors/'+sponsor.image).delete();
		this.af.database.object('/sponsors/'+sponsor.$key).remove();
	}
}
