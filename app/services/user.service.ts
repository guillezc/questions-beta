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
    this.userActive();
    this.goToEvents();
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.userInactive();
    this.goToLogin();
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getUsername(){
    return localStorage.getItem('auth_token');
  }

  goToLogin(){
    let link = ['/login'];
    this.router.navigate(link);
  }

  goToEvents(){
    let link = ['/eventos'];
    this.router.navigate(link);
  }

  checkCredentials(){
  	if(!this.isLoggedIn()){
      this.userInactive();
  		this.goToLogin();
  	}else{
      this.userActive();
    }
  }

  userActive(){
    document.getElementById("welcome-msg").innerHTML = "Bienvenido(a) "+localStorage.getItem('auth_token');
    document.getElementById("logout-item").style.display = "block";
  }

  userInactive(){
    document.getElementById("welcome-msg").innerHTML = "";
    document.getElementById("logout-item").style.display = "none";
  }
}