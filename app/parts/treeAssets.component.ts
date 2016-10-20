import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { Node }  from '../classes/node';
import { Material }  from '../classes/material';

@Component({
    selector: 'tree-assets',
    templateUrl: 'app/templates/tree-assets.component.html'
})

export class TreeAssetsComponent implements OnInit, OnDestroy {

	@Input()
  	assets: Node[] = [];


	constructor(private router : Router) {

	}

	ngOnInit() {
    	//console.log(this.assets);
	}

	ngOnDestroy() {
    	this.assets = [];
	}

	addMaterial(assetID: any){
		let link = ['/material/nuevo', {id: assetID, type: 'archivo'}];
    	this.router.navigate(link);
	}

	addSubFolder(assetID: any){
		let link = ['/material/nuevo', {id: assetID, type: 'carpeta'}];
    	this.router.navigate(link);
	}


}