import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
	messages: FirebaseListObservable<any[]>;
	messagesList: any[] = [];
	peopleItems: Array<any> = [];
  peopleSelect: Array<any> = [];
	userID = '-KPCMKA-InT8eGDHEDEF';
	newMessage: any = "";
	newChatID: any;
	chatID: any;
	existChat: boolean = false;
	isNewChat: boolean = false;
	isLoaded: boolean = false;
	sendToAll: boolean = false;

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
		this.getChats();
		this.getPeople();
	}

	getChats(){
		this.chats = this.af.database.list('people/'+this.userID+'/chats');
		this.chats.subscribe(data => {
      if(data.length > 0){
      	this.chatList = [];
      	let count: any = 0;
      	data.forEach((q: any) => {
	        this.af.database.object('/chats/'+q.$key).subscribe(chData => {
	          this.chatList.push({
	          	key: chData.$key,
	          	title: chData.title,
	          	lastMessage: chData.lastMessage
	          });
	          count++;
	          if(count==data.length)
	          	this.isLoaded = true;
	        });
	      });
	      
      }
    });
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
  	this.messagesList = [];
  	this.isNewChat = true;
  	this.existChat = false;
  }

  addChat(tChat:any, all: any){

		let tstamp: Date = new Date();
		let creator: any = this.userID;
  	this.peopleSelect[creator] = this.userID;

		this.newChatID = this.af.database.list('chats').push({
			title: tChat.value,
			timestamp: tstamp.getTime()
		}).key;

		if(all.checked){
			this.peopleItems.forEach(person=>{
				this.af.database.object('people/'+person.id+'/chats/'+this.newChatID).update({active: true});
			});
		}else{
			for (var key in this.peopleSelect) {
	  		this.af.database.object('people/'+key+'/chats/'+this.newChatID).update({active: true});
	    }
		}

    this.messagesList = [];
    this.isNewChat = false;
		this.existChat = true;
		this.loadMessages(this.newChatID);

  }

  onSubmit(chat:any){
  	this.newMessage = "";
  	let tstamp: Date = new Date();
  	this.af.database.list('messages/'+this.chatID).push({
  		name: this.userID,
      message: chat.newMessage,
      timestamp: tstamp.getTime()
  	});
  }

  loadMessages(value:any){
  	this.existChat = true;
  	this.chatID = value;
  	this.messages = this.af.database.list('messages/'+value);
  	this.messages.subscribe(msjs => {
  		if(msjs.length > 0){
  			this.messagesList = [];
      	msjs.forEach((q: any) => {
    			this.af.database.object('people/'+q.name).subscribe(people => {
			      this.messagesList.push({
	          	key: q.$key,
	          	message: q.message,
	          	pic: 'url('+ people.pic +')',
	          	name: people.name
	          });
			    });
	      });

      	ChatJS.init();
      }else{
      	this.messagesList = [];
      	ChatJS.init();
      }
    });
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
