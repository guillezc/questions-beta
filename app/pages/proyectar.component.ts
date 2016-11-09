import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Question }  from '../classes/question';

declare var ProyectedsVar: any;
import  'app/js/proyecteds.js';

@Component({
  selector: 'q-proyecteds',
  templateUrl: 'app/templates/proyecteds.component.html'
})

export class ProyectedComponent implements OnInit, OnDestroy{
  proyecteds: FirebaseListObservable<any>;
  slides: Question[] = [];
  sub: any;
  firebase: AngularFire;

  constructor(
    private router         : Router,
    public  af        : AngularFire) {

  }

  getQuestions(){
    this.proyecteds = this.af.database.list('questions', {
      query: {
        orderByChild: 'selected',
        equalTo: true
      }
    });
    this.sub = this.proyecteds.subscribe(data=>{
      this.slides = [];
      data.forEach((proyected: any)=>{
        this.af.database.object('people/'+proyected.userId).subscribe(user=>{
          let quest: Question = new Question();
          quest.userName = user.name;
          quest.question = proyected.question;
          quest.anonymous = proyected.anonymous;

          this.slides.push(quest);
        });
      });
    });
  }

  ngOnInit() {
  	ProyectedsVar.init();
    this.getQuestions();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  	ProyectedsVar.clean();
  }

}