import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

import { Frequent }  from '../classes/frequents';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'q-frequent-add',
  templateUrl: 'app/templates/frequent-questions-form.component.html'
})

export class FrequentQuestionsAddComponent implements OnInit{
  frequentObj: Frequent = new Frequent();
  frequents: FirebaseListObservable<any>;
  firebase: AngularFire; 

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
    this.frequents = this.af.database.list('frequents');

    this.frequentObj.title = [];
    this.frequentObj.title['spanish'] = '';
    this.frequentObj.title['english'] = '';
    this.frequentObj.description = [];
    this.frequentObj.description['spanish'] = '';
    this.frequentObj.description['english'] = '';

  }

  onSubmit(freq: any) { 

    freq.title = {spanish: freq.title_spanish, english: freq.title_english};
    freq.description = {spanish: freq.descrip_spanish, english: freq.descrip_english};

    delete freq['title_spanish'];
    delete freq['title_english'];
    delete freq['descrip_spanish'];
    delete freq['descrip_english'];

    this.frequents.push(freq);
    
    this.redirectToFrequents();
  }

  redirectToFrequents(){
  	let link = ['/preguntas-frecuentes'];
    this.router.navigate(link);
  }

}