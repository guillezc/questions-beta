import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { VARS } from './vars';
import  'app/assets/layouts/layout/scripts/layout.min.js';

declare var Layout: any;

@Component({
    selector: 'q-header',
    templateUrl: 'app/templates/header.component.html',
    providers: [UserService]
})

export class HeaderComponent {
	username:string = "";
	settings = VARS.SETTINGS;

	constructor(private userService : UserService){

	}

	ngOnInit() {
		if(this.userService.isLoggedIn()){
			this.username = this.userService.getUsername();
		}
		Layout.initHeader();
	}

}