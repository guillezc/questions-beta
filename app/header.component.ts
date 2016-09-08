import { Component, OnInit } from '@angular/core';
import { VARS } from './vars';
import  'app/assets/layouts/layout/scripts/layout.min.js';

declare var Layout: any;

@Component({
    selector: 'q-header',
    templateUrl: 'app/templates/header.component.html'
})

export class HeaderComponent {
	settings = VARS.SETTINGS;
	ngOnInit() {
		Layout.initHeader();
	}

}