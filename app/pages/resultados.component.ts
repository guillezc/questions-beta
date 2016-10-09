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
  sessionObj: Session = new Session();
	surveyID: any;
	isEmpty: boolean = false;
	isLoaded: boolean = false;
  isInit: boolean = true;
  proyectedUrl: SafeResourceUrl;
  intervalObs: any;

  chartLabels:string[] = [];
  chartData:number[] = [];

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
        this.session = this.af.database.object('/sessions/'+srvObj.sessionId);
        this.session.subscribe(sessObj => {
          this.sessionObj.startTime = sessObj.startTime;
          this.sessionObj.title = [];
          this.sessionObj.title['spanish'] = sessObj.title.spanish;
          this.initInterval();
        });
      });
    });
  }

  getOptions(){
    let xchartLabels: any[] = [];
    let xchartData: any[] = [];

    var optionsArr = this.getArrayOf(this.surveyObj.options);
    var counter = 0;
    var load = 0;
    var dataSize = optionsArr.length;

    optionsArr.forEach((opt: any) => {
      this.vote = this.af.database.object('/votes/'+opt.voteId);
      this.vote.subscribe(vote => {
        xchartLabels.push(opt.name.spanish);
        var voteNum = (vote.users != false) ? vote.users.length : 0;
        xchartData.push(voteNum);

        load++;
        if(voteNum == 0) counter++;
        if(counter == dataSize) this.isEmpty = true;
        if(load == dataSize){
          this.chartLabels = xchartLabels;
          this.chartData = xchartData;
          if(this.isInit){
            this.isLoaded = true;
            ResultsVar.init();
          }
        }
      });
    });
    
  }

  initInterval(){
    const inter = Observable.interval(5000);
    this.intervalObs = inter.subscribe((x: number) => {
      this.isInit = false;
      this.getOptions();
    })
  }

  getArrayOf(object: any) {
    let newArr: any[] = [];
    for (var key in object) {
      object[key]["$key"] = key;
      newArr.push(object[key]);
    }
    return newArr;
  }

  ngOnDestroy(): void {
    this.intervalObs.unsubscribe();
  }

}