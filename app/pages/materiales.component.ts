import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Sponsor }  from '../classes/sponsor';
import { Speaker }  from '../classes/speaker';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
	selector: 'q-materials',
	templateUrl: 'app/templates/materials.component.html'
})

export class MaterialsComponent implements OnInit{
	materials: FirebaseListObservable<any[]>;
	summaryList: any[] = [];
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
		this.getMaterials();
		this.setTitle("Materiales - México Cumbre de Negocios");
	}

	getMaterials(){
		this.materials = this.af.database.list('summaries');
		this.materials.subscribe(data => {
			data.forEach(summ => {
				var childs: any[] = [];
				var summTmp = {
					name: summ.titleSpanish,
					total: 0,
					childs: childs
				}

				//this.sponsorsList.push(summTmp);
				this.af.database.list('materials', {
					query: {
            orderByChild: 'parentId',
            equalTo: summ.$key 
          }
				}).subscribe(materials => {
					materials.forEach(mat => {
						var matTmp = {
							name: mat.name,
							url: mat.url
						}
						childs.push(matTmp);
					});
					summTmp.total = materials.length;
					summTmp.childs = childs;
					this.summaryList.push(summTmp);
				});
			});
			console.log(this.summaryList);
		});
	}

}