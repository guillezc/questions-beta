import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  session: any;
  surveysList: Survey[] = [];
  sessionID: any;
  isEmpty: boolean = false;
  isLoaded: boolean = false;
  surveySData: any[] = [];

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

        data.forEach((s: Survey) => {
          this.surveyObj = s;
          this.getOptions(index_chart);
          index_chart++;
        });
      }); 
    });
    
  }

  getOptions(index_chart: any){
    let xchartLabels: any[] = [];
    let xchartData: any[] = [];

    var optionsArr = this.getArrayOf(this.surveyObj.options);
    var counter = 0;
    var load = 0;
    var dataSize = optionsArr.length;

    optionsArr.forEach((opt: any) => {
      this.af.database.object('/votes/'+opt.voteId).subscribe(vote => {

        xchartLabels.push(opt.name);
        var voteNum = (vote.users != false) ? vote.users.length : 0;
        xchartData.push(voteNum);

        load++;
        if(voteNum == 0) counter++;
        if(counter == dataSize) this.isEmpty = true;
        if(load == dataSize){
          this.surveysList[index_chart].chartLabels = xchartLabels;
          this.surveysList[index_chart].chartValues = xchartData;
          ResultSesionProyectedsVar.init();
          this.isLoaded = true;
          console.log(this.surveysList[index_chart])
        }

      });
    });
  }

  getArrayOf(object: any) {
    let newArr: any[] = [];
    for (var key in object) {
      object[key]["$key"] = key;
      newArr.push(object[key]);
    }
    return newArr;
  }

}