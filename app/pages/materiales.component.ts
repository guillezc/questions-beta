import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Node }  from '../classes/node';
import { Material }  from '../classes/material';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'q-materials',
	templateUrl: 'app/templates/materials.component.html'
})

export class MaterialsComponent implements OnInit, OnDestroy{
	materials: FirebaseListObservable<any[]>;
	childrens: FirebaseObjectObservable<any[]>;
	summaryList: Node[] = [];
	storage: any;
	subAssets: any;
	subAttach: any;
	subAttachR: any;

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.getMaterials();
		this.setTitle("Materiales - México Cumbre de Negocios");
	}

	ngOnDestroy(){
		this.summaryList = [];
		this.subAssets.unsubscribe();
		this.subAttach.unsubscribe();
		this.subAttachR.unsubscribe();
	}

	getMaterials(){
		this.materials = this.af.database.list('assets');
		this.subAssets = this.materials.subscribe(data => {

			var counter = 0;
			data.forEach(summ => {

				var childs: Node[] = [];
				var materials: Material[] = [];
				var parentNode: Node = new Node();

				parentNode.id = summ.$key;
				parentNode.name = summ.nameSpanish;
				parentNode.total = 0;
				parentNode.children = childs;

				this.subAttach = this.af.database.object('assetsAttachment/'+summ.$key).subscribe(attach => {
					
					var attachsArr = this.setAttachments(attach);
					attachsArr.forEach(mat => {
						var mater: Material = new Material();
						mater.id = mat.key;
						mater.name = mat.name;
						mater.url = mat.url;

						materials.push(mater);
					});

					parentNode.material = materials;
					parentNode.total = materials.length;

					this.summaryList[counter] = parentNode;
					
					if(summ.childs != undefined){
						var childsArr = this.setChildsItems(summ.childs);
						this.getChilds(childsArr, counter);
					}
					
					counter++;
				});

			});

		});
	}

	getChilds(assets: any, counter: any){
		
		var counter_child = 0;
		assets.forEach((summ: any) => {
			
			var childs: Node[] = [];
			var materials: Material[] = [];
			var parentNode: Node = new Node();

			parentNode.id = summ.key;
			parentNode.name = summ.nameSpanish;
			parentNode.total = 0;
			parentNode.children = childs;

			this.subAttachR = this.af.database.object('assetsAttachment/'+summ.key).subscribe(attach => {

				var attachsArr = this.setAttachments(attach);

				attachsArr.forEach(mat => {
					var mater: Material = new Material();
					mater.id = mat.key;
					mater.name = mat.name;
					mater.url = mat.url;

					materials.push(mater);
				});

				parentNode.material = materials;
				parentNode.total = materials.length;

				this.summaryList[counter].children[counter_child] = parentNode;
				this.summaryList[counter].total = this.summaryList[counter].total + materials.length;
				
				if(summ.childs != undefined){
					var childsArr = this.setChildsItems(summ.childs);
					this.getChilds(childsArr, counter_child);
				}

				counter_child++;
			});
			
		});


	}

	setChildsItems(object: any){

    let newArr: any[] = [];
    for (var key in object) {
    	var id: any = key;
    	object[key].key = key;
      newArr.push(object[key]);
    }

    return newArr;

  }

  setAttachments(object: any){
  	
    let newArr: any[] = [];

    if(object.$value === undefined){
    	delete object['$key'];
	    delete object['$exists'];
	    delete object['empty'];
	    for (var key in object) {
	    	object[key].key = key;
	      newArr.push(object[key]);
	    }
    }
    
    return newArr;
  }

	addSummary(){
		let link = ['/material/nuevo'];
		this.router.navigate(link);
	}

}