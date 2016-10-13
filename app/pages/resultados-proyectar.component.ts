import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var ResultsProyectedsVar: any;
import  'app/js/results-proyecteds.js';

@Component({
  selector: 'q-results-proyecteds',
  templateUrl: 'app/templates/results-proyecteds.component.html'
})

export class ResultsProyectedComponent implements OnInit, OnDestroy {
  survey: FirebaseObjectObservable<any>;
  session: FirebaseObjectObservable<any>;
  votes: FirebaseListObservable<any[]>;
  surveyObj: Survey = new Survey();
  sessionObj: Session = new Session();
  surveyID: any;
  isEmpty: boolean = false;
  isLoaded: boolean = false;
  isInit: boolean = true;
  intervalObs: any;

  chartLabels:string[] = [];
  chartData:number[] = [];

  constructor(
    private router         : Router,
    private route          : ActivatedRoute,
    public  af         : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Resultados - México Cumbre de Negocios");
    this.route.params.subscribe(params => {
      this.surveyID = params['id'];
      this.survey = this.af.database.object('/surveys/'+this.surveyID)
      this.survey.subscribe(srvObj => {
        this.surveyObj.question = [];
        this.surveyObj.question['spanish'] = srvObj.question.spanish;
        this.surveyObj.options = srvObj.options;
        this.getOptions();
        if(srvObj.sessionId != "" && srvObj.sessionId != " "){
          this.session = this.af.database.object('/sessions/'+srvObj.sessionId);
          this.session.subscribe(sessObj => {
              this.sessionObj.startTime = sessObj.startTime ? sessObj.startTime : "";
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
        if(this.inArray(vote.$key, indexes)){

          var voteNum = (vote.users != false) ? vote.users.length : 0;
          xchartLabels.push(optionsNames[vote.$key]);
          xchartData.push(voteNum); 

          load++;
          if(voteNum == 0) counter++;
          if(counter == dataSize) this.isEmpty = true;
          if(load == dataSize){
            this.chartLabels = xchartLabels;
            this.chartData = xchartData;
            if(this.isInit){
              this.isLoaded = true;
              ResultsProyectedsVar.init();
            }
          }
        }
      });
    });
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

  ngOnDestroy(): void {
    
  }

}