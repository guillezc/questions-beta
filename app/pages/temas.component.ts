import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

import { UserService } from '../services/user.service';

import { Tag }  from '../classes/tag';

@Component({
	selector: 'q-tags',
	templateUrl: 'app/templates/tags.component.html',
	providers: [UserService]
})

export class TagsComponent implements OnInit{
	tags: FirebaseListObservable<any[]>;
	tag: FirebaseObjectObservable<any>;
	tagsList: any[] = [];
	showForm: boolean = false;
	isNew: boolean = true;
	obj: Tag = new Tag();

	constructor(
		private userService : UserService,
		private router       : Router,
		public af            : AngularFire,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.userService.checkCredentials();
		this.getTags();
		this.setTitle("Temas - México Cumbre de Negocios");
		this.initTag();
	}

	onSubmit(tag: any){
		if(this.isNew){
			this.tags.push({ 
				name: {
					spanish: tag.title_spanish,
					english: tag.title_english
				}
			});
		}else{
			this.tag.update({
				name: {
					spanish: tag.title_spanish,
					english: tag.title_english
				}
			});
		}
		this.showForm = false;
	}

	getTags(){
		this.tags = this.af.database.list('tags');
		this.tags.subscribe(data => {
			this.tagsList = data;
		});
	}

	initTag(){
		this.obj.name = [];
		this.obj.name['spanish'] = "";
  	this.obj.name['english'] = "";
	}

	addTag(){
		this.showForm = true;
		this.isNew = true;
		this.obj.name = [];
		this.obj.name['spanish'] = "";
  	this.obj.name['english'] = "";
	}

	editTag(tag: any){
		this.showForm = true;
		this.isNew = false;
		this.tag = this.af.database.object('/tags/'+tag.$key);
		this.tag.subscribe( data => {
			this.obj.name = [];
			this.obj.name['spanish'] = data.name.spanish;
  		this.obj.name['english'] = data.name.english;
		});
	}

	deleteTag(tag: any){
		if ( window.confirm("¿Desea eliminar el tema: '"+tag.name.spanish+"'?") ) {
      this.tags.remove(tag.$key);
    }
	}

	closeForm(){
		this.showForm = false;
		this.initTag();
	}

}
