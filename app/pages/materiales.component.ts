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
	assets: FirebaseListObservable<any[]>;
	childrens: FirebaseObjectObservable<any[]>;
	allAssets: any[] = [];
	allAttach: any[] = [];
	summaryList: Node[] = [];
	assetList: Node[] = [];
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
		//this.getMaterials();
		this.getAllAssets();
		this.setTitle("Materiales - México Cumbre de Negocios");
	}

	ngOnDestroy(){
		this.summaryList = [];
		this.subAssets.unsubscribe();
		this.subAttach.unsubscribe();
		//this.subAttachR.unsubscribe();
	}

	getAllAssets(){
		this.materials = this.af.database.list('assets');
		this.subAssets = this.materials.subscribe(data => {

		});
		this.assets = this.af.database.list('assetstest');
		this.assets.subscribe(assetsData => {
			this.allAssets = this.buildTreeAssets(assetsData, false);
			//this.generateData();
			console.log(this.allAssets);
		});
	}

	buildTreeAssets(assets: any, parentID: any){
		let arrayTmp: Node[] = [];
		assets.forEach((asset: any) => {
			if(asset.parentId == parentID){

				var childs: Node[] = [];
				var node: Node = new Node();
				node.id = asset.$key;
				node.name = asset.nameSpanish;
				node.total = 0;
				node.children = childs;

				var children = this.buildTreeAssets(assets, asset.$key);
				if(children){
					node.children = children;
				}

				arrayTmp.push(node);
				//console.log(arrayTmp);
				/*var childs: Node[] = [];
				var materials: Material[] = [];
				var node: Node = new Node();

				node.id = asset.$key;
				node.name = asset.nameSpanish;
				node.total = 0;
				node.children = childs;

				this.assetList[node.id] = node;*/
			}
		});
		return arrayTmp;
	}

	generateData(){
		var counter = 0;
		this.allAssets.forEach((asset: any) => {
			var children: Node[] = [];
			var materials: Material[] = [];
			var parentNode: Node = new Node();

			parentNode.id = asset.$key;
			parentNode.name = asset.nameSpanish;
			parentNode.total = 0;
			parentNode.children = children;

			this.subAttach = this.af.database.object('assetsAttachment/'+asset.$key).subscribe(attach => {
					
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
				
				if(asset.children.length>0){
					this.generateDataRecursive(asset.children, counter);
				}
				
				counter++;
			});

		});
	}

	generateDataRecursive(assets: any, counter: any){

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