import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Sponsor }  from '../classes/sponsor';
import { Speaker }  from '../classes/speaker';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";

@Component({
  selector: 'q-sponsors-add',
  templateUrl: 'app/templates/sponsors-add.component.html'
})

export class SponsorAddComponent implements OnInit{
  sponsorObj: Sponsor = new Sponsor();
  speakers: FirebaseListObservable<any>;
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
    this.sponsorObj.position = "";
    this.sponsorObj.title = "";
    this.sponsorObj.image = "";
    this.sponsorObj.type = "Principal";
    this.sponsorObj.url = "";
  }

  onSubmit(spon: any) { 
    this.saving = true;
    var imageElement: any = document.getElementById("logo-img");
    var selectFile = imageElement.files[0];
    var imageType = /^image\//;
    var sponsorClass = this;
    
    if(selectFile != undefined){
      if (!imageType.test(selectFile.type)) {
        alert('Tipo de archivo no válido');
      }else{
        var uploadTask = this.storageRef.child('sponsors/' + selectFile.name).put(selectFile);
        spon.image = selectFile.name;

        uploadTask.on('state_changed', function(snapshot: any){

        }, function(error: any) {

        }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          spon.urlImg = downloadURL;
          sponsorClass.saving = false;
          sponsorClass.af.database.list('sponsors').push(spon);
          sponsorClass.redirectToPatrocinadores();
        });
      }
    }else{
      alert('Seleccione un archivo de imagen para el patrocinador');
    }
  }

  redirectToPatrocinadores(){
  	let link = ['/patrocinadores'];
    this.router.navigate(link);
  }

}