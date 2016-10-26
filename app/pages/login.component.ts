import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserService } from '../services/user.service';

declare var LoginVar: any;
import  'app/js/login.js';

@Component({
  selector: 'q-login',
  templateUrl: 'app/templates/login.component.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit{
	user:any = {name: "", pwd: ""};
	msgError:any = "";

	constructor(
		private userService : UserService,
    private router      : Router,
    public  af          : AngularFire,
    private titleService: Title) {

  }

	ngOnInit(){
		LoginVar.init();
	}

	onSubmit(data: any) {
    this.userService.login(data.username, data.password).subscribe(userData=>{
    	if(userData.length != 0){
    		if(userData[0].password == data.password){
    			this.userService.authenticate(userData[0].username);
    			LoginVar.clean();
    		}else{
    			this.msgError = "La contraseña es incorrecta."
    		}
    	}else{
    		this.msgError = "El usuario no existe."
    	}
    });
  }

}