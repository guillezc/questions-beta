import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

import { VARS } from './vars';
import  'app/assets/layouts/layout/scripts/layout.min.js';

declare var Layout: any;

@Component({
    selector: 'q-sidebar',
    templateUrl: 'app/templates/sidebar.component.html',
    providers: [UserService]
})

export class SidebarComponent {
	isLogged:boolean = false;
	settings = VARS.SETTINGS;

	constructor(private userService : UserService){

	}

	ngOnInit() {
		this.isLogged = this.userService.isLoggedIn();
		Layout.initSidebar();
	}

	logout(){
		console.log("logout");
		this.userService.logout();
	}

}