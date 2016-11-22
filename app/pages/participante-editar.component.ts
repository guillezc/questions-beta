import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-participants-add',
  templateUrl: 'app/templates/participant-edit.component.html'
})

export class ParticipantEditComponent implements OnInit{
  speakerObj: Speaker = new Speaker();
  speaker: FirebaseObjectObservable<any>;
  speakerInfo: FirebaseObjectObservable<any>;
  sub: any;
  speakerID: any;

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
    this.setTitle("Editar participante - México Cumbre de Negocios");

    this.sub = this.route.params.subscribe(params => {
      this.speakerID = params['id'];
      this.speaker = this.af.database.object('/people/'+this.speakerID);
      this.speaker.subscribe((data: Speaker) => {
        this.speakerInfo = this.af.database.object('peopleInfo/'+data.$key);
        this.speakerInfo.subscribe((info: Speaker)=>{

          this.speakerObj.$key = data.$key;
          this.speakerObj.name = data.name;
          this.speakerObj.title = data.title;
          this.speakerObj.pic = data.pic;
          this.speakerObj.company = data.company;
          this.speakerObj.isCommittee = data.isCommittee ? data.isCommittee : false;
          this.speakerObj.isSpeaker = data.isSpeaker ? data.isSpeaker : false;

          this.speakerObj.address = info.address;
          this.speakerObj.englishBio = (info.englishBio == undefined) ? "NA" : info.englishBio;
          this.speakerObj.spanishBio = (info.spanishBio == undefined) ? "NA" : info.spanishBio;
          this.speakerObj.englishProfile = (info.englishProfile == undefined) ? "NA" : info.englishProfile;
          this.speakerObj.spanishProfile = (info.spanishProfile == undefined) ? "NA" : info.spanishProfile;
          this.speakerObj.phoneNumber = info.phoneNumber;
          this.speakerObj.status = info.status;
          this.speakerObj.webSite = info.webSite;
        });
      });
    });
  }

  onSubmit(spk: any) { 

    var speakerObj = {
      company: spk.company,
      name: spk.name,
      pic: spk.pic,
      title: spk.title,
      isCommittee: spk.isCommittee,
      isSpeaker: spk.isSpeaker
    }

    this.af.database.object('/people/'+this.speakerID).update(speakerObj);
    this.af.database.object('peopleInfo/'+this.speakerID).update({
      //address: spk.address,
      englishBio: (spk.englishBio == "") ? "NA" : spk.englishBio,
      spanishBio: (spk.spanishBio == "") ? "NA" : spk.spanishBio,
      englishProfile: (spk.englishProfile == "") ? "NA" : spk.englishProfile,
      spanishProfile: (spk.spanishProfile == "") ? "NA" : spk.spanishProfile,
      //phoneNumber: spk.phoneNumber,
      status: spk.status
      //webSite: spk.webSite
    });

    this.updateOnSessions(speakerObj);
  }

  updateOnSessions(speak: any){
    this.af.database.list('sessions').subscribe(dataSess => {
      dataSess.forEach((sess: Session) => {
        if(sess.speakers){
          for (var key in sess.speakers) {
            if (sess.speakers.hasOwnProperty(key)) {
              if(this.speakerID == key)
                this.af.database.object('/sessions/'+sess.$key+'/speakers/'+key).update(speak);
            }
          }
        }
        if(sess.managers){
          for (var key in sess.managers) {
            if (sess.managers.hasOwnProperty(key)) {
              if(this.speakerID == key)
                this.af.database.object('/sessions/'+sess.$key+'/managers/'+key).update(speak);
            }
          }
        }
      });
      this.redirectToParticipants();
    });
  }

  redirectToParticipants(){
  	let link = ['/participantes'];
    this.router.navigate(link);
  }

}