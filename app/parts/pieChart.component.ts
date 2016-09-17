import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'q-chart',
    templateUrl: 'app/templates/pie-chart.component.html'
})

export class PieChartComponent implements OnInit {

	@Input()
  	pieChartLabels: string[];

  	@Input()
  	pieChartData: number[];

  	pieChartTitle: string = 'Votaciones';
  	pieChartType: string = 'pie';
  	pieLegend: boolean = true;
  	pieOptions: any = {
  		defaults: {
  			global:{
  				title: true
  			}
  		}
  	};

	constructor() {

	}

	ngOnInit() {

	}

	chartClicked(e: any):void {
    	
  	}

  	chartHovered(e: any):void {
	    
	}

}