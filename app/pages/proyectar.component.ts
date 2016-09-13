import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var ProyectedsVar: any;
import  'app/js/proyecteds.js';

@Component({
  selector: 'q-proyecteds',
  templateUrl: 'app/templates/proyecteds.component.html'
})

export class ProyectedComponent implements OnInit{
  proyecteds: FirebaseListObservable<any[]>;
  slides: Array<any> = [];
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
  }

  ngOnInit() {
  	ProyectedsVar.init();
    this.getQuestions();
  }

  ngOnDestroy(){
  	ProyectedsVar.clean();
  }

}