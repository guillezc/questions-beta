import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

declare var VoteSessionJS: any;
import  'app/js/votes-session.js';

@Component({
  selector: 'q-votes-session',
  templateUrl: 'app/templates/votes-session.component.html'
})

export class VotesSessionComponent implements OnInit {
  votes: FirebaseListObservable<any[]>;
  surveyList: Survey[] = [];
  isLoaded: boolean = false;
  proyectedReady: boolean = false;
  sessionID: any;
  resultsProyectedUrl: any;

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    public  af        : AngularFire,
    private titleService   : Title,
    private sanit: DomSanitizer) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Votaciones - México Cumbre de Negocios");
    this.route.params.subscribe(params => {
      this.sessionID = params['id'];
      this.resultsProyectedUrl = this.sanit.bypassSecurityTrustResourceUrl("#/resultadosSesionProyectados/"+this.sessionID);
      this.getSurveys();
    });
  	
  }

  getSurveys(){
  	this.votes = this.af.database.list('surveys', {
      query: {
        orderByChild: 'sessionId',
        equalTo: this.sessionID 
      }
    });  
    this.votes.subscribe(data => {
      data.forEach((s: Survey) => {
        this.af.database.object('/sessions/'+s.sessionId).subscribe(sessionData => {
          var arr: any[] = [];
          sessionData.startTime = this.convertUTCTimeToLocalDate(sessionData.startTime);
          arr[0] = sessionData;
          s.session = arr;
        });
      });
      this.surveyList = data;
      VoteSessionJS.init();
      this.isLoaded = true;
      this.proyectedDelay();
    });	
  }

  proyectedDelay(){
    var component: any = this;
    window.setTimeout(function(){
      component.proyectedReady = true;
    }, 5000);
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
    VoteSessionJS.init();
  }

  convertUTCTimeToLocalDate(_time: any){
    var utcDate = new Date(_time);
    var offset = utcDate.getTimezoneOffset();
    var diffZone = _time+(offset*60*1000);
    return new Date(diffZone);
  }

}