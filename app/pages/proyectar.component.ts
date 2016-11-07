import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Question }  from '../classes/question';

declare var ProyectedsVar: any;
import  'app/js/proyecteds.js';

@Component({
  selector: 'q-proyecteds',
  templateUrl: 'app/templates/proyecteds.component.html'
})

export class ProyectedComponent implements OnInit{
  proyecteds: FirebaseListObservable<any>;
  slides: Question[] = [];
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
    this.proyecteds.subscribe(data=>{
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
  	ProyectedsVar.clean();
  }

}