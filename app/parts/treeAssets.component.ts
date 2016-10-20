import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { Node }  from '../classes/node';
import { Material }  from '../classes/material';

import * as firebase from "firebase";

@Component({
    selector: 'tree-assets',
    templateUrl: 'app/templates/tree-assets.component.html'
})

export class TreeAssetsComponent implements OnInit, OnDestroy {

	@Input()
	assets: Node[] = [];

	storageRef: any;
	storage: any;

	constructor(
		private router : Router,
		public af      : AngularFire) {

	}

	ngOnInit() {
    	this.storageRef = firebase.storage().ref();
    	this.storage = firebase.storage();
	}

	ngOnDestroy() {
    	this.assets = [];
	}

	addMaterial(assetID: any){
		let link = ['/material/nuevo', {id: assetID, type: 'archivo'}];
    	this.router.navigate(link);
	}

	addSubFolder(assetID: any){
		let link = ['/material/nuevo', {id: assetID, type: 'carpeta'}];
    	this.router.navigate(link);
	}

	deleteFolder(asset: Node){
		if ( window.confirm("¿Desea la carpeta: '"+asset.name+"'?\n Se borraran todas las subcarpetas y archivos dentro de éste.") ){
			this.deleteAssets(asset);
		}
	}

	deleteAssets(asset: Node){
		this.af.database.object('assets/'+asset.id).remove();
		if(asset.material.length>0){
			asset.material.forEach(attach=>{
				this.storage.ref().child('materials/'+attach.name).delete();
				this.af.database.object('assetsAttachment/'+attach.assetId+'/'+attach.id).remove();
			});
		}
		if(asset.children.length>0){
			asset.children.forEach(assetChild=>{
				this.deleteAssets(assetChild);
			});
		}
	}

	deleteMaterial(attach: Material){
		if ( window.confirm("¿Desea eliminar el archivo: '"+attach.name+"'?") ) {
  		this.storage.ref().child('materials/'+attach.name).delete();
			this.af.database.object('assetsAttachment/'+attach.assetId+'/'+attach.id).remove();
    }
	}

}