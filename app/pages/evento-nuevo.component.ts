import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Event }  from '../classes/event';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
	selector: 'q-events-add',
	templateUrl: 'app/templates/event-add.component.html'
})

export class EventsAddComponent implements OnInit{
	events: FirebaseListObservable<any[]>;
	eventList: Event[] = [];
	addObj: Event = new Event();
	sessions: FirebaseListObservable<any[]>;
	sessionItems: Array<any> = [];
	sessionSelect: Array<any> = [];
	eventItems: Array<any> = [];
	days: any[];

	timepickerStartOpts: any = {
    minuteStep: 1
  };

  timepickerEndOpts: any = {
    minuteStep: 1
  };

	datepickerStartOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
  };

  datepickerEndOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true
  };

	constructor(
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Agregar Evento - México Cumbre de Negocios");
		this.initEvent();
		this.getSessions();
	}

	onSubmit(event: any){
		event.startTime = event.startTime.getTime();
    event.endTime = event.endTime.getTime();
    event.name = [];
    event.name['spanish'] = event.name_spanish;
    event.name['english'] = event.name_english;
    delete event['name_spanish'];
    delete event['name_english'];

    this.events = this.af.database.list('/events');
    const newEventID = this.events.push(event).key;
    for (var key in this.sessionSelect) {
    	this.af.database.object('/events/'+newEventID+'/sessionsId/'+key).update({ show: true});
    }

    let link = ['/eventos'];
    this.router.navigate(link);

	}

	initEvent(){
		this.addObj.name = [];
    this.addObj.name['spanish'] = "";
    this.addObj.name['english'] = "";
		this.addObj.startTime = new Date();
    this.addObj.endTime = new Date();

    console.log(this.addObj);
	}

	getSessions(){
    this.sessions = this.af.database.list('sessions');
    this.sessions.subscribe(data => {
      this.sessionItems = this.setSessionItems(data);
    });
  }

  addSession(value:any):void {
  	this.sessionSelect[value.id] = value.id;
  }

  removeSession(value:any):void {
    delete this.sessionSelect[value.id];
  }

  setSessionItems(sessions: Session[]){

    let items: Array<any> = [];
    if(sessions.length>0){
      sessions.forEach((sesss: Session) => {
        items.push( {
          id  : sesss.$key,
          text: sesss.title
        });
      });
    }

    return items;
  }

}