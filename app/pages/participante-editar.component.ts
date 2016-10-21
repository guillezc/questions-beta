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
    this.setTitle("Agregar participante - México Cumbre de Negocios");

    this.sub = this.route.params.subscribe(params => {
      this.speakerID = params['id'];
      this.speaker = this.af.database.object('/people/'+this.speakerID);
      this.speaker.subscribe(data => {
        this.speakerObj = data;
      });
    });
  }

  onSubmit(speak: any) { 
    if(speak.bio == ""){
      speak.bio = "NA"
    }
    this.speaker.update(speak);
    this.updateOnSessions(speak);
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