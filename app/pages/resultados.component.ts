import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Title, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var ResultsVar: any;
import  'app/js/results.js';

@Component({
  selector: 'q-results',
  templateUrl: 'app/templates/results.component.html'
})

export class ResultsComponent implements OnInit, OnDestroy {
  surveyObj: Survey = new Survey();
  survey: FirebaseObjectObservable<any>;
  session: FirebaseObjectObservable<any>;
  vote: FirebaseObjectObservable<any>;
  votes: FirebaseListObservable<any[]>;
  sessionObj: Session = new Session();
	surveyID: any;
	isEmpty: boolean = false;
	isLoaded: boolean = false;
  isInit: boolean = true;
  proyectedUrl: SafeResourceUrl;
  intervalObs: any;
  proyectedReady: boolean = false;

  chartLabels:string[] = [];
  chartData:number[] = [];
  chartLabelColor: string = "#000";

	constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    public  af             : AngularFire,
    private titleService   : Title,
    private sanit: DomSanitizer) {
      
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Resultados - México Cumbre de Negocios");
    this.route.params.subscribe(params => {
      this.surveyID = params['id'];
      this.proyectedUrl = this.sanit.bypassSecurityTrustResourceUrl("#/resultadosProyectados/"+this.surveyID);
      this.survey = this.af.database.object('/surveys/'+this.surveyID);
      this.survey.subscribe(srvObj => {
        this.surveyObj.question = [];
        this.surveyObj.question['spanish'] = srvObj.question.spanish;
        this.surveyObj.options = srvObj.options;
        this.getOptions();
        
        if(srvObj.sessionId != "" && srvObj.sessionId != " "){
          this.session = this.af.database.object('/sessions/'+srvObj.sessionId);
          this.session.subscribe(sessObj => {
              this.sessionObj.startTime = this.convertUTCTimeToLocalDate(sessObj.startTime);
              this.sessionObj.title = [];
              this.sessionObj.title['spanish'] = sessObj.title ? sessObj.title.spanish : "";
            
          });
        }
      });
    });
  }

  getOptions(){
    this.votes = this.af.database.list('votes');
    this.votes.subscribe(data => {
      var indexes = this.getIndexesOf(this.surveyObj.options);
      var optionsNames = this.getOptionsName(this.surveyObj.options);

      let xchartLabels: any[] = [];
      let xchartData: any[] = [];

      var counter = 0;
      var load = 0;
      var dataSize = indexes.length;

      if(dataSize == 0){
        this.isLoaded = true;
        this.isEmpty = true;
      }

      data.forEach((vote: any) => {
        const voteId = vote.$key;
        const voteArr = this.getVotesOf(vote);

        if(this.inArray(voteId, indexes)){

          var voteNum = (vote != false) ? voteArr.length : 0;
          xchartLabels.push(optionsNames[voteId]);
          xchartData.push(voteNum); 

          load++;
          if(voteNum == 0) counter++;
          if(counter == dataSize) this.isEmpty = true;
          if(load == dataSize){
            this.chartLabels = xchartLabels;
            this.chartData = xchartData;
            if(this.isInit){
              this.isLoaded = true;
              this.proyectedDelay();
              ResultsVar.init();
            }
          }
        }
      });
    });
  }

  proyectedDelay(){
    var component: any = this;
    window.setTimeout(function(){
      component.proyectedReady = true;
    }, 5000);
  }

  getIndexesOf(object: any){
    let newArr: any[] = [];
    for (var key in object) {
      newArr.push(object[key].voteId);
    }
    return newArr;
  }

  getOptionsName(object: any){
    let newArr: any[] = [];
    for (var key in object) {
      newArr[object[key].voteId] = object[key].name.spanish;
    }
    return newArr;
  }

  inArray(needle: any, haystack: any) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
    }
    return false;
  }

  getVotesOf(object: any) {
    delete object['$key'];
    delete object['$exists'];
    delete object['empty'];
    let newArr: any[] = [];
    for (var key in object) {
      newArr.push(key);
    }
    return newArr;
  }

  ngOnDestroy(): void {

  }

  convertUTCTimeToLocalDate(_time: any){
    var utcDate = new Date(_time);
    var offset = utcDate.getTimezoneOffset();
    var diffZone = _time+(offset*60*1000);
    return new Date(diffZone);
  }

}