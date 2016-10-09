import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Frequent }  from '../classes/frequents';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

declare var InfoJS: any;
import  'app/js/infogral.js';

@Component({
	selector: 'q-general-info',
	templateUrl: 'app/templates/general-info.component.html'
})

export class GeneralInfoComponent implements OnInit{
	frequents: FirebaseListObservable<any[]>;
	frequentsList: Frequent[] = [];

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.getFrequents();
		this.setTitle("Información general - México Cumbre de Negocios");
	}

	getFrequents(){
		this.frequents = this.af.database.list('generalinfo');
		this.frequents.subscribe(data => {
			let tmpList: Frequent[] = [];
			data.forEach((f: any) => {
				let freq: Frequent = new Frequent();
				freq.$key = f.$key;
				freq.title = f.title.spanish;
				freq.description = f.description.spanish;

				tmpList.push(freq);
			});
			this.frequentsList = tmpList;
			InfoJS.init();
		});
	}

	addFrequent(){
		let link = ['/info-general/nuevo'];
		this.router.navigate(link);
	}

	editFrequent(freq: Frequent){
		let link = ['/info-general/editar', freq.$key];
		this.router.navigate(link);
	}

	deleteFrequent(freq: Frequent){
		this.af.database.object('/generalinfo/'+freq.$key).remove();
	}
}
