import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Node }  from '../classes/node';
import { Material }  from '../classes/material';

@Component({
    selector: 'tree-assets',
    templateUrl: 'app/templates/tree-assets.component.html'
})

export class TreeAssetsComponent implements OnInit, OnDestroy {

	@Input()
  	assets: Node[] = [];


	constructor() {

	}

	ngOnInit() {
    	//console.log(this.assets);
	}

	ngOnDestroy() {
    	this.assets = [];
	}


}