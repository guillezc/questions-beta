import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location }  from '../classes/location';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
	selector: 'q-locations',
	templateUrl: 'app/templates/locations.component.html'
})

export class LocationsComponent implements OnInit{
	locations: FirebaseListObservable<any[]>;
	locationsList: Location[] = [];
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
		this.getLocations();
		this.setTitle("Locaciones - México Cumbre de Negocios");
	}

	getLocations(){
		this.locations = this.af.database.list('locations');
		this.locations.subscribe(data => {
			this.locationsList = data;
		});
	}

	addLocation(){
		let link = ['/locacion/nuevo'];
		this.router.navigate(link);
	}

	editLocation(location: Location){
		let link = ['/locacion/editar', location.$key];
		this.router.navigate(link);
	}

	deleteLocation(location: Location){
		this.storage.ref().child('locations/'+location.image).delete();
		this.af.database.object('/locations/'+location.$key).remove();
	}
}
