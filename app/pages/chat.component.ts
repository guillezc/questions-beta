import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Session }  from '../classes/session';
import { Speaker }  from '../classes/speaker';
import { Message }  from '../classes/message';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

declare var ChatJS: any;
import  'app/js/chat.js';

@Component({
	selector: 'q-participants',
	templateUrl: 'app/templates/chat.component.html',
	providers: [UserService]
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
  allPeopleSelect: Array<any> = [];
	userID = '-KPCMKA-InT8eGDHEDEF';
	newMessage: any = "";
	newChatID: any;
	chatID: any;
	existChat: boolean = false;
	isNewChat: boolean = false;
	isLoaded: boolean = false;
	sendToAll: boolean = false;

	constructor(
		private userService : UserService,
		private router       : Router,
		public af            : AngularFire,
		private render		 :Renderer,
		public titleService  : Title) {

	}

	public setTitle(newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	ngOnInit() {  
		this.userService.checkCredentials();
		this.setTitle("Chat - México Cumbre de Negocios");
		this.getChats();
		this.getPeople();
	}

	getChats(){
		/*this.chats = this.af.database.list('people/'+this.userID+'/chats');
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
    });*/
    this.chats = this.af.database.list('chatMembers');
    this.chats.subscribe(members=>{
      this.chatList = [];
      let count: any = 0;
      members.forEach(memberChat=>{
        if(this.isAdminChat(memberChat)){
          this.af.database.object('/chats/'+memberChat.$key).subscribe(chData => {
            this.chatList.push({
              key: chData.$key,
              title: chData.title,
              lastMessage: chData.lastMessage
            });
            if(count==members.length)
              this.isLoaded = true;
          });
        }
        count++;
      });
    });
	}

	getPeople(){
		this.people = this.af.database.list('people');
		this.people.subscribe(people => {
      this.peopleList = people;
      this.peopleItems = this.setSpeakersItems(people);
      this.generateAllSelecteds();
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

  	let typeChat: string = "global";
		let tstamp: Date = new Date();
		let creator: any = this.userID;
    let chatMembers:any = {};
    let members:any = {};

    this.peopleSelect[creator] = true;

    if(!all.checked){
      typeChat = (this.getLengthPeople() > 2) ? "group" : "personal";
    }

    this.newChatID = this.af.database.list('chats').push({
      title: tChat.value,
      timestamp: tstamp.getTime(),
      type: typeChat
    }).key;
    
  	if(all.checked){
      for(var key in this.allPeopleSelect){
        chatMembers[key] = true;
      }
      members[this.newChatID] = chatMembers;
  		this.af.database.object('chatMembers').update(members);
  	}else{
      for(var key in this.peopleSelect){
        chatMembers[key] = true;
      };
      members[this.newChatID] = chatMembers;
      this.af.database.object('chatMembers').update(members);
    }

    this.messagesList = [];
    this.isNewChat = false;
		this.existChat = true;
		this.loadMessages(this.newChatID);

  }

  toggleSelect(all: any){
		this.sendToAll = all.checked;
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

  getLengthPeople(){
  	var count = 0;
  	for (var key in this.peopleSelect) {
  		count++;
    }
    return count;
  }

  addMember(value:any):void {
    this.peopleSelect[value.id] = true;
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

  isAdminChat(memberChat: any){
    for(var key in memberChat){
      if(key == this.userID)
        return true;
    }
    return false;
  }

  generateAllSelecteds(){
  	this.peopleItems.forEach(item=>{
  		this.allPeopleSelect[item.id] = true;
  	});
  }

}
