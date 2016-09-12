import { Component, OnInit } from '@angular/core';

import { VARS } from './vars';
import  'app/assets/layouts/layout/scripts/layout.min.js';

declare var Layout: any;

@Component({
    selector: 'q-sidebar',
    templateUrl: 'app/templates/sidebar.component.html'
})

export class SidebarComponent {
	settings = VARS.SETTINGS;
	ngOnInit() {
		Layout.initSidebar();
	}

}