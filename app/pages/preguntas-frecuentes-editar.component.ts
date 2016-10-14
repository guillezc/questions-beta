import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Frequent }  from '../classes/frequents';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-frequent-edit',
  templateUrl: 'app/templates/frequent-questions-form.component.html'
})

export class FrequentQuestionsEditComponent implements OnInit{
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
    this.frequent = this.af.database.object('/faq/'+this.frequentID);
    this.frequent.subscribe(data => {
      this.frequentObj.question = [];
      this.frequentObj.question['spanish'] = data.question.spanish;
      this.frequentObj.question['english'] = data.question.english;
      this.frequentObj.answer = [];
      this.frequentObj.answer['spanish'] = data.answer.spanish;
      this.frequentObj.answer['english'] = data.answer.english;
    });
    this.frequents = this.af.database.list('faq');
  }

  onSubmit(freq: any) { 

    freq.question = {spanish: freq.title_spanish, english: freq.title_english};
    freq.answer = {spanish: freq.descrip_spanish, english: freq.descrip_english};

    delete freq['title_spanish'];
    delete freq['title_english'];
    delete freq['descrip_spanish'];
    delete freq['descrip_english'];

    this.frequent.update(freq);
    
    this.redirectToFrequents();
  }

  redirectToFrequents(){
  	let link = ['/preguntas-frecuentes'];
    this.router.navigate(link);
  }

}