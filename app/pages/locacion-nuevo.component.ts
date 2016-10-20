import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Location }  from '../classes/location';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
  selector: 'q-locations-add',
  templateUrl: 'app/templates/locations-add.component.html'
})

export class LocationAddComponent implements OnInit{
  locationObj: Location = new Location();
  storageRef: any;
  saving = false;

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    public af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Agregar patrocinador - México Cumbre de Negocios");
    this.storageRef = firebase.storage().ref();
    this.locationObj.urlImg = "";
    this.locationObj.name = {spanish: "", english: ""};
    this.locationObj.image = "";
    this.locationObj.codename = "";
  }

  onSubmit(loc: any) { 
    this.saving = true;
    var imageElement: any = document.getElementById("logo-img");
    var selectFile = imageElement.files[0];
    var imageType = /^image\//;
    var locationClass = this;

    var newLocation = {
      codename: loc.codename,
      image: "",
      name: {
        english: loc.name_english,
        spanish: loc.name_spanish
      },
      urlImg: ""
    };
    
    if(selectFile != undefined){
      if (!imageType.test(selectFile.type)) {
        alert('Tipo de archivo no válido');
      }else{
        var uploadTask = this.storageRef.child('locations/' + selectFile.name).put(selectFile);
        newLocation.image = selectFile.name;

        uploadTask.on('state_changed', function(snapshot: any){

        }, function(error: any) {

        }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          newLocation.urlImg = downloadURL;
          locationClass.saving = false;
          locationClass.af.database.list('locations').push(newLocation);
          locationClass.redirectToLocations();
        });
      }
    }else{
      alert('Seleccione un archivo de imagen para el patrocinador');
    }
  }

  redirectToLocations(){
  	let link = ['/locaciones'];
    this.router.navigate(link);
  }

}