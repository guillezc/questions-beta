import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {
	@LocalStorage()
	public authToken:any = null;

	private loggedIn:boolean = false;

	constructor(
		private router: Router,
		public  af    : AngularFire) {
    //this.loggedIn = !!this.authToken;
  }

  login(username: any, password: any){
  	return this.af.database.list('administrators', {
  		query: {
		    orderByChild: 'username',
		    equalTo: username 
		  }
  	});
  }

  authenticate(username: any){
  	this.authToken = username;
  	this.loggedIn = true;
  	//let link = ['/eventos'];
  	//this.router.navigate(link);
  	window.setTimeout(function(){
      window.location.href = '/#/eventos';
    },500);
  }

  logout() {
    this.authToken = null;
    this.loggedIn = false;
    //let link = ['/login'];
  	//this.router.navigate(link);
    window.setTimeout(function(){
      window.location.href = '/#/login';
    },500);
  }

  getUsername(){
  	return this.authToken;
  }

  isLoggedIn() {
    if(this.authToken == null){
    	this.loggedIn = false;
    }else{
			this.loggedIn = true;
    }
    return this.loggedIn;
  }

  checkCredentials(){
  	if(this.authToken == null){
  		let link = ['/login'];
  		this.router.navigate(link);
  	}
  }
}