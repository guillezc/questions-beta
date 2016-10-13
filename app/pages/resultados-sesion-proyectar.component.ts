import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Session }  from '../classes/session';
import { Survey }  from '../classes/survey';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var ResultSesionProyectedsVar: any;
import  'app/js/results-session-proyecteds.js';

@Component({
  selector: 'q-results-session-proyecteds',
  templateUrl: 'app/templates/results-session-proyecteds.component.html'
})

export class ResultSesionProyectedComponent implements OnInit {
  surveyObj: Survey = new Survey();
  sessionObj: Session = new Session();
  surveys: FirebaseListObservable<any[]>;
  option: FirebaseObjectObservable<any[]>;
  votes: FirebaseListObservable<any[]>;
  session: any;
  surveysList: Survey[] = [];
  sessionID: any;
  isEmpty: boolean = false;
  isLoaded: boolean = false;
  surveySData: any[] = [];
  isInit: boolean = true;
  intervalObs: any;

  chartData: any[] = [];

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
      this.sessionID = params['id'];
      this.af.database.object('/sessions/'+this.sessionID).subscribe(sess =>  {
        this.session = sess;
      });
      this.surveys = this.af.database.list('surveys', {
        query: {
          orderByChild: 'sessionId',
          equalTo: this.sessionID 
        }
      });  
      this.surveys.subscribe(data => {
        this.surveysList = data;
        var index_chart = 0;
        var data_size = data.length;
        data.forEach((s: Survey) => {
          this.surveyObj = s;
          this.getOptions(index_chart, data_size, s.options);
          index_chart++;
        });
      }); 
    });
    
  }

  getOptions(index_chart: any, data_size: any, srvOptions: any){
    this.votes = this.af.database.list('votes');
    this.votes.subscribe(data => {
      var indexes = this.getIndexesOf(srvOptions);
      var optionsNames = this.getOptionsName(srvOptions);

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
            this.surveysList[index_chart].chartLabels = xchartLabels;
            this.surveysList[index_chart].chartValues = xchartData;
            console.log(this.surveysList);
            if(index_chart == (data_size-1)){
              ResultSesionProyectedsVar.init();
              this.isLoaded = true;
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

}