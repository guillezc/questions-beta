import { Component, Input, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

declare var Chart: any;
import 'node_modules/chart.js/dist/Chart.js';

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
      showAllTooltips: true,
      legend:{
        labels:{
          fontSize: 24,
          usePointStyle: false
        },
        onClick: function(event: any, legendItem: any){
          return false;
        }
      },
      animation:{
        animateRotate: false,
        animateScale: false
      },
      tooltips: {
        mode: 'label',
        backgroundColor: 'rgba(43,54,67,0.8)',
        titleFontSize: 20,
        bodyFontSize: 20,
        xPadding: 12,
        yPadding: 8,
        caretSize: 7,
        cornerRadius: 5,
        callbacks: {
          label: function(tooltipItem: any, data: any) {
            var allData = data.datasets[tooltipItem.datasetIndex].data;
            var tooltipLabel = data.labels[tooltipItem.index];
            var tooltipData = allData[tooltipItem.index];
            var total = 0;
            for (var i in allData) {
                total += allData[i];
            }
            var tooltipPercentage = Math.round((tooltipData / total) * 100);
            return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
          }
        }
      }
  	};

	constructor() {

	}

	ngOnInit() {

    Chart.pluginService.register({
      beforeRender: function(chart: any) {
        if (chart.config.options.showAllTooltips) {
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function(dataset: any, i: any) {
            chart.getDatasetMeta(i).data.forEach(function(sector: any, j: any) {
              chart.pluginTooltips.push(new Chart.Tooltip({
                  _chart: chart.chart,
                  _chartInstance: chart,
                  _data: chart.data,
                  _options: chart.options.tooltips,
                  _active: [sector]
              }, chart));
            });
          });
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: function(chart: any, easing: any) {
        if (chart.config.options.showAllTooltips) {
          if (!chart.allTooltipsOnce) {
            if (easing !== 1)
              return;
            chart.allTooltipsOnce = true;
          }
          chart.options.tooltips.enabled = true;
          Chart.helpers.each(chart.pluginTooltips, function(tooltip: any) {
            tooltip.initialize();
            tooltip.update();
            tooltip.pivot();
            tooltip.transition(easing).draw();
          });
          chart.options.tooltips.enabled = false;
        }
      }
    });

	}

	chartClicked(e: any):void {
    	
  	}

  	chartHovered(e: any):void {
	    
	}

}