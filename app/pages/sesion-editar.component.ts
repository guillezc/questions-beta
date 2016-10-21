import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';
import { Tag }      from '../classes/tag';
import { Location }      from '../classes/location';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import  'app/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js';
import  'app/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js';

@Component({
  selector: 'q-sessions-edit',
  templateUrl: 'app/templates/session-edit.component.html'
})

export class SessionEditComponent implements OnInit, OnDestroy {
  sessionObj: Session = new Session();
  session: FirebaseObjectObservable<any>;
  people: FirebaseListObservable<any[]>;
  locations: FirebaseListObservable<any[]>;
  locationItems: Array<any> = [];
  locationSelect: Array<any> = [];
  events: any[];
  peopleItems: Array<any> = [];
  managerSelect: Array<any> = [];
  oratorSelect: Array<any> = [];
  eventItems: Array<any> = [];
  tags: FirebaseListObservable<any>;
  tagsItems: Array<any> = [];
  tagsSelect: Array<any> = [];
  firebase: AngularFire;
  submitted = false;
  sub: any;
  sessionID: any;
  subsSession: any;

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
    private router         : Router,
    private route          : ActivatedRoute,
    public  af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Editar sesión - México Cumbre de Negocios");
    this.sub = this.route.params.subscribe(params => {
      this.sessionID = params['id'];
      this.getLocations();
      this.getPeople();
      this.getTags();
      this.getSession();
    });
  }

  ngOnDestroy(){
    this.subsSession.unsubscribe();
  }

  getLocations(){
    this.locations = this.af.database.list('locations');
    this.locations.subscribe(data => {
      this.locationItems = this.setLocationsItems(data);
    });
  }

  getPeople(){
    this.people = this.af.database.list('people');
    this.people.subscribe(data => {
      this.peopleItems = this.setSpeakersItems(data);
    });
  }

  getTags(){
    this.tags = this.af.database.list('tags');
    this.tags.subscribe(data => {
      this.tagsItems = this.setTagsItems(data);
    });
  }

  onSubmit(sess: any) { 
    this.submitted = false;
    sess.startTime = sess.startTime.getTime();
    sess.endTime = sess.endTime.getTime();

    sess.title = {spanish: sess.title_spanish, english: sess.title_english};
    sess.description = {spanish: sess.description_spanish, english: sess.description_english};

    delete sess['title_spanish'];
    delete sess['title_english'];
    delete sess['description_spanish'];
    delete sess['description_english'];

    this.session.update(sess);

    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(){
    this.session = this.af.database.object('/sessions/'+this.sessionID);
    this.subsSession = this.session.subscribe(data => {
      this.getSessionLocation(data.locationId);
      this.getSessionManagers();
      this.getSessionOrators();
      this.getSessionTags();

      this.sessionObj.tags = data.tags ? data.tags : [];
      this.sessionObj.startTime = new Date(data.startTime);
      this.sessionObj.endTime = new Date(data.endTime);
      this.sessionObj.allDay = data.allDay;
      this.sessionObj.title = [];
      this.sessionObj.title['spanish'] = data.title.spanish;
      this.sessionObj.title['english'] = data.title.english;
      this.sessionObj.description = [];
      this.sessionObj.description['spanish'] = data.description.spanish;
      this.sessionObj.description['english'] = data.description.english;
    });
  }

  getSessionLocation(locationId: any){
    if(locationId){
      this.af.database.object('/locations/'+locationId).subscribe(data => {
        this.locationSelect = this.setLocationItem(data);
      });
    }
  }

  getSessionManagers(){
    this.af.database.list('/sessions/'+this.sessionID+'/managers').subscribe(data => {
      this.managerSelect = this.setSpeakersItems(data);
    });
  }

  getSessionOrators(){
    this.af.database.list('/sessions/'+this.sessionID+'/speakers').subscribe(data => {
      this.oratorSelect = this.setSpeakersItems(data);
    });
  }

  getSessionTags(){
    this.af.database.list('/sessions/'+this.sessionID+'/tags').subscribe(data => {
      this.tagsSelect = this.setTagsItems(data);
    });
  }

  setLocationsItems(locations: Location[]){

    let items: Array<any> = [];
    if(locations.length>0){
      locations.forEach((loc: Location) => {
        items.push( {
          id  : loc.$key,
          text: loc.name.spanish+'/'+loc.name.english
        });
      });
    }

    return items;
  }

  setLocationItem(location: any){

    let items: Array<any> = [];
    items.push( {
      id  : location.$key,
      text: location.name.spanish+'/'+location.name.english
    });
    return items;
  }

  setSpeakersItems(speakers: Speaker[]){

    let items: Array<any> = [];
    if(speakers.length>0){
      speakers.forEach((spk: Speaker) => {
        items.push( {
          id  : spk.$key,
          text: spk.name
        });
      });
    }

    return items;
  }

  setTagsItems(tags: Tag[]){

    let items: Array<any> = [];
    if(tags.length>0){
      tags.forEach((tg: Tag) => {
        items.push( {
          id  : tg.$key,
          text: tg.name.spanish
        });
      });
    }

    return items;
  }

  setEvtSessionItems(sessions: any){

  }

  addLocation(value:any):void {
    this.af.database.object('sessions/'+this.sessionID).update({locationId: value.id});
  }

  removeLocation(value:any):void {

  }

  addSpeaker(value:any):void {
    this.af.database.object('/people/'+value.id).subscribe(data => {
      var okey = data['$key'];
      delete data['$key'];
      delete data['$exists'];
      this.af.database.object('sessions/'+this.sessionID+'/speakers/'+okey).update(data);
    });
    
  }

  removeSpeaker(value:any):void {
    this.af.database.list('sessions/'+this.sessionID+'/speakers').remove(value.id);
  }

  addManager(value:any):void {
    this.af.database.object('/people/'+value.id).subscribe(data => {
      var mkey = data['$key'];
      delete data['$key'];
      delete data['$exists'];
      this.af.database.object('sessions/'+this.sessionID+'/managers/'+mkey).update(data);
    });
    
  }

  removeManager(value:any):void {
    this.af.database.list('sessions/'+this.sessionID+'/managers').remove(value.id);
  }

  addTag(value:any):void {
    this.af.database.object('/tags/'+value.id).subscribe(data => {
      var tkey = data['$key'];
      delete data['$key'];
      delete data['$exists'];
      this.af.database.object('sessions/'+this.sessionID+'/tags/'+tkey).update(data);
    });
    
  }

  removeTag(value:any):void {
    this.af.database.list('sessions/'+this.sessionID+'/tags').remove(value.id);
  }

}