import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

export class ResultsProyectedComponent implements OnInit {
  surveyObj: Survey = new Survey();
  sessionObj: Session = new Session();
  surveyID: any;
  isEmpty: boolean = false;
  isLoaded: boolean = false;

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
      this.af.database.object('/surveys/'+this.surveyID).subscribe(srvObj => {
        this.surveyObj = srvObj;
        this.getOptions();
        this.af.database.object('/sessions/'+srvObj.sessionId).subscribe(sessObj => {
          this.sessionObj = sessObj;
        });
      });
    });
    
  }

  getOptions(){
    var xchartLabels=[];
    var xchartData=[];

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
          this.chartLabels = xchartLabels;
          this.chartData = xchartData;
          this.isLoaded = true;
          ResultsProyectedsVar.init();
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