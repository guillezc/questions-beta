import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-participants-add',
  templateUrl: 'app/templates/participant-add.component.html'
})

export class ParticipantAddComponent implements OnInit{
  speakerObj: Speaker = new Speaker();
  speakers: FirebaseListObservable<any>;
  speakerInfo: FirebaseObjectObservable<any>;
  firebase: AngularFire; 

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
    this.setTitle("Agregar participante - México Cumbre de Negocios");

    this.speakerObj.name = "";
    this.speakerObj.title = "";
    this.speakerObj.pic = "";
    this.speakerObj.company = "";
    this.speakerObj.isCommittee = false;
    this.speakerObj.isSpeaker = false;

    this.speakerObj.address = "";
    this.speakerObj.englishBio = "";
    this.speakerObj.spanishBio = "";
    this.speakerObj.englishProfile = "";
    this.speakerObj.spanishProfile = "";
    this.speakerObj.phoneNumber = "";
    this.speakerObj.status = "Inactive"
    this.speakerObj.webSite = "";
  }

  onSubmit(spk: Speaker) {

    this.speakers = this.af.database.list('people');
    var newID = this.speakers.push({
      company: spk.company,
      name: spk.name,
      pic: spk.pic,
      title: spk.title,
      isCommittee: spk.isCommittee,
      isSpeaker: spk.isSpeaker
    }).key;
    this.af.database.object('peopleInfo/'+newID).update({
      id: newID,
      address: spk.address,
      englishBio: (spk.englishBio == "") ? "NA" : spk.englishBio,
      spanishBio: (spk.spanishBio == "") ? "NA" : spk.spanishBio,
      englishProfile: (spk.englishProfile == "") ? "NA" : spk.englishProfile,
      spanishProfile: (spk.spanishProfile == "") ? "NA" : spk.spanishProfile,
      phoneNumber: spk.phoneNumber,
      status: spk.status,
      webSite: spk.webSite
    });
    
    this.redirectToParticipants();
  }

  redirectToParticipants(){
  	let link = ['/participantes'];
    this.router.navigate(link);
  }

}