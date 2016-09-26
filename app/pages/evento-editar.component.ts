import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Session }  from '../classes/session';
import { Event }  from '../classes/event';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
	selector: 'q-events-edit',
	templateUrl: 'app/templates/event-edit.component.html'
})

export class EventsEditComponent implements OnInit{
	events: FirebaseListObservable<any[]>;
  event: FirebaseObjectObservable<any>;
	eventList: Event[] = [];
	eventObj: Event = new Event();
  eventSessions: FirebaseListObservable<any[]>;
	sessions: FirebaseListObservable<any[]>;
	sessionItems: Array<any> = [];
	sessionSelect: Array<any> = [];
  eventID: any;

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
    private route        : ActivatedRoute,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Agregar Evento - México Cumbre de Negocios");
    this.route.params.subscribe(params => {
      this.eventID = params['id'];
      this.getSessionSelects();
      this.getEvent();
      this.getSessions();
    });
	}

	onSubmit(event: any){
		event.startTime = event.startTime.getTime();
    event.endTime = event.endTime.getTime();
    event.name = {spanish: event.name_spanish, english: event.name_english};
    delete event['name_spanish'];
    delete event['name_english'];

    this.event.update(event);

    let link = ['/eventos'];
    this.router.navigate(link);

	}

	getEvent(){
    this.event = this.af.database.object('/events/'+this.eventID);
    this.event.subscribe(data => {

      this.eventObj.startTime = new Date(data.startTime);
      this.eventObj.endTime = new Date(data.endTime);
      this.eventObj.name = [];
      this.eventObj.name['spanish'] = data.name.spanish;
      this.eventObj.name['english'] = data.name.english;
    });
	}

	getSessions(){
    this.sessions = this.af.database.list('sessions');
    this.sessions.subscribe(data => {
      this.sessionItems = this.getItemsToSelect(data);
    });
  }

  getSessionSelects(){
    this.eventSessions = this.af.database.list('/events/'+this.eventID+'/sessionsId');
    this.eventSessions.subscribe(data => {
      let count: any = 0;
      data.forEach(( sessId: any) => {
        this.af.database.object('/sessions/'+sessId.$key).subscribe(sess => {
          sessId.title = sess.title;
          count++;
          if(count == data.length){
            this.sessionSelect = this.getItemsToSelect(data);
          }
        });
      });
    });
  }

  addSession(value:any):void {
    this.af.database.object('/events/'+this.eventID+'/sessionsId/'+value.id).update({ show: true});
  }

  removeSession(value:any):void {
    this.af.database.list('/events/'+this.eventID+'/sessionsId').remove(value.id);
  }

  getItemsToSelect(data: any[]){

    let items: Array<any> = [];
    if(data.length>0){
      data.forEach((field: any) => {
        items.push( {
          id  : field.$key,
          text: field.title
        });
      });
    }

    return items;
  }

}