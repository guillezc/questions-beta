import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Location }  from '../classes/location';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
  selector: 'q-locations-add',
  templateUrl: 'app/templates/locations-edit.component.html'
})

export class LocationEditComponent implements OnInit{
  locationObj: Location = new Location();
  location: FirebaseObjectObservable<any>;
  storageRef: any;
  saving = false;
  sub: any;
  locationID: any;
  locationImg: any;
  locationUrlImg: any;

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
    this.setTitle("Editar locación - México Cumbre de Negocios");
    this.storageRef = firebase.storage().ref();
    this.sub = this.route.params.subscribe(params => {
      this.locationID = params['id'];
      this.location = this.af.database.object('/locations/'+this.locationID);
      this.location.subscribe((data: Location) => {
        this.locationImg = data.image;
        this.locationUrlImg = data.urlImg;
        data.image = "";

        this.locationObj = data;
      });
    });
  }

  onSubmit(loc: any) { 
    this.saving = true;
    var imageElement: any = document.getElementById("logo-img");
    var selectFile = imageElement.files[0];
    var imageType = /^image\//;
    var locationClass = this;

    var editLocation = {
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
        locationClass.storageRef.child('locations/' + locationClass.locationImg).delete();
        var uploadTask = locationClass.storageRef.child('locations/' + selectFile.name).put(selectFile);
        editLocation.image = selectFile.name;

        uploadTask.on('state_changed', function(snapshot: any){

        }, function(error: any) {

        }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          editLocation.urlImg = downloadURL;
          locationClass.saving = false;
          locationClass.location.update(editLocation);
          locationClass.redirectToLocations();
        });
      }
    }else{
      editLocation.image = locationClass.locationImg;
      editLocation.urlImg = locationClass.locationUrlImg;
      locationClass.saving = false;
      locationClass.location.update(editLocation);
      locationClass.redirectToLocations();
    }
  }

  redirectToLocations(){
  	let link = ['/locaciones'];
    this.router.navigate(link);
  }

}