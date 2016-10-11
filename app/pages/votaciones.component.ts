import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

declare var VoteJS: any;
import  'app/js/votes.js';

@Component({
  selector: 'q-votes',
  templateUrl: 'app/templates/votes.component.html'
})

export class VotesComponent implements OnInit {
  votes: FirebaseListObservable<any[]>;
  surveyList: Survey[] = [];
  isLoaded: Boolean = false;

  constructor(
    private router         : Router,
    public  af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getSurveys(){
  	this.votes = this.af.database.list('surveys');  
    this.votes.subscribe(data => {
      data.forEach((s: Survey) => {
        this.af.database.object('/sessions/'+s.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          arr[0] = sessionData;
          s.session = arr;
        });
      });
      this.surveyList = data;
      VoteJS.init();
      this.isLoaded = true;
    });	
  }

  ngOnInit() {
    this.setTitle("Votaciones - México Cumbre de Negocios");
  	this.getSurveys();
  }

  goToResults(srv: Survey) {
  	let link = ['/resultados/', srv.$key];
    this.router.navigate(link);
  }

  addSurvey(){
    let link = ['/votacion/nueva'];
    this.router.navigate(link);
  }

  editSurvey(srv: Survey) {
  	let link = ['/votacion/editar', srv.$key];
    this.router.navigate(link);
  }

  deleteSurvey(s: any) {
    this.af.database.list('/surveys').remove(s.$key);
    VoteJS.init();
  }

  filterByType(srvType: any){
    this.isLoaded = false;
    VoteJS.destroyTable();

    if(srvType=="..."){
      this.getSurveys();
    }else{
      this.votes = this.af.database.list('surveys', {
        query: {
          orderByChild: 'type',
          equalTo: srvType
        }
      });  
      this.votes.subscribe(data => {
        data.forEach((s: Survey) => {
          this.af.database.object('/sessions/'+s.sessionId).subscribe(sessionData => {
            var arr: any[] = [];
            arr[0] = sessionData;
            s.session = arr;
          });
        });
        this.surveyList = data;
        VoteJS.init();
        this.isLoaded = true;
      });
    }
  }

}