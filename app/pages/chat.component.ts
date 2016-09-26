import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';
import { Message }  from '../classes/message';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';

declare var ChatJS: any;
import  'app/js/chat.js';

@Component({
	selector: 'q-participants',
	templateUrl: 'app/templates/chat.component.html'
})

export class ChatComponent implements OnInit{
	@ViewChild ('fileInput') fileInput: ElementRef;
	chats: FirebaseListObservable<any[]>;
	chatList: any[] = [];
	people: FirebaseListObservable<any[]>;
	peopleList: Message[] = [];
	peopleItems: Array<any> = [];
  peopleSelect: Array<any> = [];
	userID = '-KPCMKA-InT8eGDHER2P';
	existChat: boolean = false;
	isNewChat: boolean = false;

	constructor(
		private router       : Router,
		public af            : AngularFire,
		private render		 :Renderer,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.setTitle("Chat - México Cumbre de Negocios");
		//ChatJS.init();
		this.getChats();
		this.getPeople();
	}

	getChats(){
		this.chats = this.af.database.list('chats');
		this.chats.subscribe(data => {
      this.chatList = data;
    });

	    /*this.messages.subscribe(data => {
	      data.forEach((q: Message) => {
	        this.af.database.object('/people/'+q.name).subscribe(speakerData => {
	          q.name = speakerData.name;
	          q.picUrl = 'url(' + speakerData.pic + ')'
	        });
	      });
	      console.log(data);
	      this.messageList = data;
	      ChatJS.init();
	    });*/
	}

	getPeople(){
		this.people = this.af.database.list('people');
		this.people.subscribe(people => {
      this.peopleList = people;
      this.peopleItems = this.setSpeakersItems(people);
    });
	}

	showImageBrowseDlg() {
	    let event = new MouseEvent('click', {bubbles: true});
	    event.stopPropagation();
	    this.render.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  newChat(){
  	this.isNewChat = true;
  }

  addMember(value:any):void {
    this.peopleSelect[value.id] = value.id;
  }

  removeMember(value:any):void {
    delete this.peopleSelect[value.id];
  }

  setSpeakersItems(speakers: any[]){

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

}
