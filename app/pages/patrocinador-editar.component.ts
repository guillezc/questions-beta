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
  templateUrl: 'app/templates/sponsors-edit.component.html'
})

export class SponsorEditComponent implements OnInit{
  sponsorObj: Sponsor = new Sponsor();
  sponsor: FirebaseObjectObservable<any>;
  storageRef: any;
  saving = false;
  sub: any;
  sponsorID: any;
  sponsorImg: any;
  sponsorUrlImg: any;

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
    this.sub = this.route.params.subscribe(params => {
      this.sponsorID = params['id'];
      this.sponsor = this.af.database.object('/sponsors/'+this.sponsorID);
      this.sponsor.subscribe((data: Sponsor) => {
        this.sponsorImg = data.image;
        this.sponsorUrlImg = data.urlImg;
        data.image = "";

        this.sponsorObj = data;
      });
    });
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
        sponsorClass.storageRef.child('sponsors/' + sponsorClass.sponsorImg).delete();
        var uploadTask = sponsorClass.storageRef.child('sponsors/' + selectFile.name).put(selectFile);
        spon.image = selectFile.name;

        uploadTask.on('state_changed', function(snapshot: any){

        }, function(error: any) {

        }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          spon.urlImg = downloadURL;
          sponsorClass.saving = false;
          sponsorClass.sponsor.update(spon);
          sponsorClass.redirectToPatrocinadores();
        });
      }
    }else{
      spon.image = sponsorClass.sponsorImg;
      spon.urlImg = sponsorClass.sponsorUrlImg;
      sponsorClass.saving = false;
      sponsorClass.sponsor.update(spon);
      sponsorClass.redirectToPatrocinadores();
    }
  }

  redirectToPatrocinadores(){
  	let link = ['/patrocinadores'];
    this.router.navigate(link);
  }

}