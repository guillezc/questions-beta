import { Component, OnInit } from '@angular/core';
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
  selector: 'q-sessions-add',
  templateUrl: 'app/templates/session-add.component.html'
})

export class SessionAddComponent implements OnInit {
  addObj: Session = new Session();
  session: FirebaseListObservable<any>;
  people: FirebaseListObservable<any>;
  locations: FirebaseListObservable<any[]>;
  locationItems: Array<any> = [];
  locationSelect: any = "";
  peopleItems: Array<any> = [];
  managerSelect: Array<any> = [];
  oratorSelect: Array<any> = [];
  eventItems: Array<any> = [];
  events: any[];
  tags: FirebaseListObservable<any>;
  tagsItems: Array<any> = [];
  tagsSelect: Array<any> = [];

  firebase: AngularFire; 
  isAllDays: Boolean = false;

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
    public af        : AngularFire,
    private titleService   : Title) {

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
     this.setTitle("Agregar sesión - México Cumbre de Negocios");
     this.initSession();
     this.getLocations();
     this.getPeople();
     this.getTags();
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

  initSession(){
    this.addObj.startTime = new Date();
    this.addObj.endTime = new Date();
    this.addObj.allDay = false;
    this.addObj.hasDetails = false;
    this.addObj.onMySchedule = false;
    this.addObj.canAsk = false;
    this.addObj.title = [];
    this.addObj.title['spanish'] = "";
    this.addObj.title['english'] = "";
    this.addObj.description = [];
    this.addObj.description['spanish'] = "";
    this.addObj.description['english'] = "";
  }

  onSubmit(sess: any) { 

    if(this.locationSelect != ""){
      sess.locationId = this.locationSelect;
      this.af.database.object('locations/'+this.locationSelect).subscribe(loc=>{
        sess.locationName = {english: loc.name.english, spanish: loc.name.spanish};
        sess.locationPic = loc.urlImg;
      });
    }

    sess.startTime = sess.startTime.getTime();
    sess.endTime = sess.endTime.getTime();

    if(sess.allDay)
      sess.endTime = sess.startTime

    sess.title = {spanish: sess.title_spanish, english: sess.title_english};
    sess.description = {spanish: sess.description_spanish, english: sess.description_english};

    delete sess['title_spanish'];
    delete sess['title_english'];
    delete sess['description_spanish'];
    delete sess['description_english'];
    delete sess['location_spanish'];
    delete sess['location_english'];

    this.session = this.af.database.list('/sessions');
    const newID = this.session.push(sess).key;
    for (var key in this.oratorSelect) {
      if (this.oratorSelect.hasOwnProperty(key)) {
        this.af.database.object('/sessions/'+newID+'/speakers/'+key).update(this.oratorSelect[key]);
      }
    }
    for (var mkey in this.managerSelect) {
      if (this.managerSelect.hasOwnProperty(mkey)) {
        this.af.database.object('/sessions/'+newID+'/managers/'+mkey).update(this.managerSelect[mkey]);
      }
    }
    for (var tkey in this.tagsSelect) {
      if (this.tagsSelect.hasOwnProperty(tkey)) {
        this.af.database.object('/sessions/'+newID+'/tags/'+tkey).update({ 
          name: {
            spanish: this.tagsSelect[tkey].name.spanish,
            english: this.tagsSelect[tkey].name.english
          } 
        });
      }
    }
    
    this.redirectToSessions();
  }

  redirectToSessions(){
    let link = ['/sesiones'];
    this.router.navigate(link);
  }

  getSession(idSession: any){
    this.session.subscribe(data => {
      this.addObj = data;
    });
  }

  addLocation(value:any):void {
    this.locationSelect = value.id;
  }

  removeLocation(value:any):void {
    this.locationSelect = "";
  }

  addSpeaker(value:any):void {
    this.af.database.object('/people/'+value.id).subscribe(data => {
      var spkID = data['$key'];
      delete data['$key'];
      delete data['$exists'];
      this.oratorSelect[spkID] = data;
    });
  }

  removeSpeaker(value:any):void {
    delete this.oratorSelect[value.id];
  }

  addManager(value:any):void {
    this.af.database.object('/people/'+value.id).subscribe(data => {
      var spkID = data['$key'];
      delete data['$key'];
      delete data['$exists'];
      this.managerSelect[spkID] = data;
    });
  }

  removeManager(value:any):void {
    delete this.managerSelect[value.id];
  }

  addTag(value:any){
    this.af.database.object('/tags/'+value.id).subscribe(data => {
      var tgID = data['$key'];
      delete data['$key'];
      delete data['$exists'];
      this.tagsSelect[tgID] = data;
    });
  }

  removeTag(value:any):void {
    delete this.tagsSelect[value.id];
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

}