import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Frequent }  from '../classes/frequents';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

declare var FrequentJS: any;
import  'app/js/frequents.js';

@Component({
	selector: 'q-frequent-questions',
	templateUrl: 'app/templates/frequent-questions.component.html'
})

export class FrequentQuestionsComponent implements OnInit{
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
		this.setTitle("Preguntas frecuentes - México Cumbre de Negocios");
	}

	getFrequents(){
		this.frequents = this.af.database.list('frequents');
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
			FrequentJS.init();
		});
	}

	addFrequent(){
		let link = ['/pregunta-frecuente/nuevo'];
		this.router.navigate(link);
	}

	editFrequent(freq: Frequent){
		let link = ['/pregunta-frecuente/editar', freq.$key];
		this.router.navigate(link);
	}

	deleteFrequent(freq: Frequent){
		this.af.database.object('/frequents/'+freq.$key).remove();
	}
}
