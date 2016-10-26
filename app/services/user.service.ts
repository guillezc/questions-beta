import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {

	private loggedIn:boolean = false;

	constructor(
		private router: Router,
		public  af    : AngularFire) {
    
      this.loggedIn = !!localStorage.getItem('auth_token');
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
  	localStorage.setItem('auth_token', username);
    this.loggedIn = true;
    document.getElementById("welcome-msg").innerHTML = "Bienvenido(a) "+username;
    document.getElementById("logout-item").style.display = "block";
    this.goToEvents();
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    document.getElementById("welcome-msg").innerHTML = "";
    document.getElementById("logout-item").style.display = "none";
    this.goToLogin();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUsername(){
    return localStorage.getItem('auth_token');
  }

  goToLogin(){
    window.location.href = '/#/login';
  }

  goToEvents(){
    window.location.href = '/#/eventos';
  }

  checkCredentials(){
  	if(!this.isLoggedIn()){
  		this.goToLogin();
  	}
  }
}