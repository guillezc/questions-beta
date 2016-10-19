import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	materialObs: FirebaseObjectObservable<any[]>;
	asset: Node = new Node();
	material: Material = new Material();
	storageRef: any;
  	saving = false;

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.storageRef = firebase.storage().ref();
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Material Nuevo - México Cumbre de Negocios");
	}

	onSubmit(asset: any){
		this.saving = true;
		var pdfElement: any = document.getElementById("pdf-material");
	    var selectFile = pdfElement.files[0];
	    var fileType = /^application\/pdf/;
	    var materialClass = this;
	    var newAttach = {name: "", url: ""};
	    var newAsset = {nameSpanish: asset.nameSpanish, nameEnglish: asset.nameEnglish, childs: {}}

	    var newAssetID = materialClass.af.database.list('assets').push(newAsset).key;

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
	      alert('Seleccione un archivo pdf');
	    }
	}

	redirectToMateriales(){
		let link = ['/materiales'];
    	this.router.navigate(link);
	}

}