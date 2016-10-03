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
    this.speakerObj.bio = "";
    this.speakerObj.pic = "";
  }

  onSubmit(sess: any) { 

    this.speakers = this.af.database.list('people');
    this.speakers.push(sess);
    
    this.redirectToParticipants();
  }

  redirectToParticipants(){
  	let link = ['/participantes'];
    this.router.navigate(link);
  }

}