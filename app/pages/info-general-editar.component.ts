import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Frequent }  from '../classes/info';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-generalinfo-edit',
  templateUrl: 'app/templates/generalinfo-form.component.html'
})

export class GeneralInfoEditComponent implements OnInit{
  frequentObj: Frequent = new Frequent();
  frequents: FirebaseListObservable<any>;
  frequent: FirebaseObjectObservable<any>;
  firebase: AngularFire; 
  frequentID: any;

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
    this.setTitle("Agregar participante - México Cumbre de Negocios");
    this.route.params.subscribe(params => {
      this.frequentID = params['id'];
      this.getFrequent();
    });
  }

  getFrequent(){
    this.frequent = this.af.database.object('/generalinfo/'+this.frequentID);
    this.frequent.subscribe(data => {
      this.frequentObj.title = [];
      this.frequentObj.title['spanish'] = data.title.spanish;
      this.frequentObj.title['english'] = data.title.english;
      this.frequentObj.description = [];
      this.frequentObj.description['spanish'] = data.description.spanish;
      this.frequentObj.description['english'] = data.description.english;
    });
    this.frequents = this.af.database.list('generalinfo');
  }

  onSubmit(freq: any) { 

    freq.title = {spanish: freq.title_spanish, english: freq.title_english};
    freq.description = {spanish: freq.descrip_spanish, english: freq.descrip_english};

    delete freq['title_spanish'];
    delete freq['title_english'];
    delete freq['descrip_spanish'];
    delete freq['descrip_english'];

    this.frequent.update(freq);
    
    this.redirectToFrequents();
  }

  redirectToFrequents(){
  	let link = ['/info-general'];
    this.router.navigate(link);
  }

}