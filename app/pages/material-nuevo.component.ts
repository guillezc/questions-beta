import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Node }  from '../classes/node';
import { Material }  from '../classes/material';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
	selector: 'q-materials',
	templateUrl: 'app/templates/material-add.component.html'
})

export class MaterialAddComponent implements OnInit{
	assetObs: FirebaseObjectObservable<any>;
	materialObs: FirebaseObjectObservable<any>;
	asset: Node = new Node();
	material: Material = new Material();
	storageRef: any;
	saving = false;
	isFile = false;
	sub: any;
	assetID: any;
	assetType: any;

	constructor(
		private router       : Router,
		private route 		 : ActivatedRoute,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.storageRef = firebase.storage().ref();
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Material Nuevo - México Cumbre de Negocios");
		this.sub = this.route.params.subscribe(params => {
	      this.assetID = params['id'];
	      this.assetType = params['type'];

	      if(this.assetID != undefined && this.assetType != undefined){
	      	if(this.assetType == 'archivo'){
	      		this.assetObs = this.af.database.object('assets/'+this.assetID);
	      		this.assetObs.subscribe(assetData => {
	      			this.isFile = true;
	      			this.asset.nameSpanish = assetData.name.spanish;
	      			this.asset.nameEnglish = assetData.name.english;
	      		});
	      	}
	      }
	      
	    });
	}

	onSubmit(asset: any){
		this.saving = true;
		var pdfElement: any = document.getElementById("pdf-material");
    var selectFile = pdfElement.files[0];
    var fileType = /^application\/pdf/;
    var materialClass = this;
    var newAttach = {name: "", url: ""};
    var newAsset = {name: {english: asset.nameEnglish, spanish: asset.nameSpanish}, childs: {}, parentId: false}
    var newAssetID = '';

    //var newAssetID = this.assetID != undefined ? this.assetID : materialClass.af.database.list('assets').push(newAsset).key;

    if(this.assetID != undefined){
    	if(this.assetType == 'archivo'){
    		newAssetID = this.assetID;
    	}else{
    		newAsset.parentId = this.assetID;
    		newAssetID = materialClass.af.database.list('assets').push(newAsset).key;
    	}
    }else{
    	newAssetID = materialClass.af.database.list('assets').push(newAsset).key;
    }

    if(selectFile != undefined){
      if (!fileType.test(selectFile.type)) {
        alert('Tipo de archivo no válido');
      }else{
        var uploadTask = this.storageRef.child('materials/' + selectFile.name).put(selectFile);
        newAttach.name = selectFile.name;

        uploadTask.on('state_changed', function(snapshot: any){

        }, function(error: any) {

        }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          newAttach.url = downloadURL;
          materialClass.saving = false;
          materialClass.af.database.list('assetsAttachment/'+newAssetID).push(newAttach);
          materialClass.redirectToMateriales();
        });
      }
    }else{
    	if(this.assetType == 'archivo'){
    		alert('Por favor ingrese el archivo PDF');
    	}else{
    		materialClass.redirectToMateriales();
    	}
    }
	}

	generateParent(asset: any){

	}

	redirectToMateriales(){
		let link = ['/materiales'];
    	this.router.navigate(link);
	}

}