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
  surveysList: Survey[] = [];
  sessionID: any;
  isEmpty: boolean = false;
  isLoaded: boolean = false;
  surveySData: any[] = [];

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
      /*this.firebase.database.object('/surveys/'+this.surveyID).subscribe(srvObj => {
        this.surveyObj = srvObj;
        this.getOptions();
        this.firebase.database.object('/sessions/'+srvObj.sessionId).subscribe(sessObj => {
          this.sessionObj = sessObj;
        });
      });*/

    });
    
  }

  getOptions(index_chart: any){
    ResultSesionProyectedsVar.reset();

    let votesObj: any[] = [];
    let votemp: any[] = [];
    votemp.push("Opcion");
    votemp.push("Numero de votos");
    votesObj.push(votemp);
    //ResultSesionProyectedsVar.setVote(index_chart, votemp);

    var optionsArr = this.getArrayOf(this.surveyObj.options);
    var counter = 0;
    var load = 0;
    var dataSize = optionsArr.length;

    optionsArr.forEach((opt: any) => {
      this.af.database.object('/votes/'+opt.voteId).subscribe(vote => {
        let votemp: any[] = [];
        votemp.push(opt.name);
        var voteNum = (vote.users != false) ? vote.users.length : 0;
        votemp.push(voteNum);
        votesObj.push(votemp);
        ResultSesionProyectedsVar.setVote(index_chart, votesObj);

        load++;
        if(voteNum == 0) counter++;
        if(counter == dataSize) this.isEmpty = true;
        if(load == dataSize){
          ResultSesionProyectedsVar.init(index_chart);
          this.isLoaded = true;
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