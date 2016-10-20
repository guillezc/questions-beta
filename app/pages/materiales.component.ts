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
	attachs: FirebaseListObservable<any[]>;
	assets: FirebaseListObservable<any[]>;
	allAssets: any[] = [];
	allAttach: any[] = [];
	subAssets: any;
	subAttach: any;


	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.getAllAssets();
		this.setTitle("Materiales - México Cumbre de Negocios");
	}

	ngOnDestroy(){
		this.allAttach = [];
		this.subAssets.unsubscribe();
		this.subAttach.unsubscribe();
	}

	getAllAssets(){
		this.attachs = this.af.database.list('assetsAttachment');
		this.subAttach = this.attachs.subscribe(data => {
			this.allAttach = this.convertAttachments(data);
			this.assets = this.af.database.list('assets');
			this.subAssets = this.assets.subscribe(assetsData => {
				this.allAssets = this.buildTreeAssets(assetsData, false);
			});
		});
	}

	buildTreeAssets(assets: any, parentID: any){
		let arrayTmp: Node[] = [];
		assets.forEach((asset: any) => {
			if(asset.parentId == parentID){

				var childs: Node[] = [];
				var materials: Material[] = [];
				var node: Node = new Node();
				node.id = asset.$key;
				node.name = asset.nameSpanish;
				node.children = childs;
				node.material = this.getAttachments(node.id);
				node.total = node.material.length;

				var children = this.buildTreeAssets(assets, asset.$key);
				if(children){
					node.children = children;
					children.forEach(child=>{
						node.total = node.total + child.total;
					});
				}

				arrayTmp.push(node);
			}
		});
		return arrayTmp;
	}

	getAttachments(assetID: any){

		let arrayTmp: Material[] = [];
		this.allAttach.forEach(attach=>{
			if(attach.assetkey == assetID){
				var mater: Material = new Material();
				mater.assetId = assetID;
				mater.id = attach.key;
				mater.name = attach.name;
				mater.url = attach.url;

				arrayTmp.push(mater);
			}
		});
		return arrayTmp;
	}

	convertAttachments(attachs: any[]){
		let newArr: any[] = [];
		attachs.forEach(attachObj=>{
			var assetID = attachObj['$key'];
			delete attachObj['$key'];
	    delete attachObj['$exists'];
	    delete attachObj['empty'];
	    for (var key in attachObj) {
	    	attachObj[key].assetkey = assetID;
	    	attachObj[key].key = key;
	      newArr.push(attachObj[key]);
	    }
		});
		return newArr;
	}

	addSummary(){
		let link = ['/material/nuevo'];
		this.router.navigate(link);
	}

}