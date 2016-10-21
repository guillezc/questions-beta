"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
require("node_modules/chart.js/dist/Chart.js");
var PieChartComponent = (function () {
    function PieChartComponent() {
        this.pieChartTitle = 'Votaciones';
        this.pieChartType = 'pie';
        this.pieLegend = true;
        this.pieOptions = {
            showAllTooltips: true,
            legend: {
                labels: {
                    fontSize: 24,
                    usePointStyle: false
                },
                onClick: function (event, legendItem) {
                    return false;
                }
            },
            animation: {
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
                    label: function (tooltipItem, data) {
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
    }
    PieChartComponent.prototype.ngOnInit = function () {
        Chart.pluginService.register({
            beforeRender: function (chart) {
                if (chart.config.options.showAllTooltips) {
                    chart.pluginTooltips = [];
                    chart.config.data.datasets.forEach(function (dataset, i) {
                        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
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
            afterDraw: function (chart, easing) {
                if (chart.config.options.showAllTooltips) {
                    if (!chart.allTooltipsOnce) {
                        if (easing !== 1)
                            return;
                        chart.allTooltipsOnce = true;
                    }
                    chart.options.tooltips.enabled = true;
                    Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                        tooltip.initialize();
                        tooltip.update();
                        tooltip.pivot();
                        tooltip.transition(easing).draw();
                    });
                    chart.options.tooltips.enabled = false;
                }
            }
        });
    };
    PieChartComponent.prototype.chartClicked = function (e) {
    };
    PieChartComponent.prototype.chartHovered = function (e) {
    };
    return PieChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "pieChartLabels", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "pieChartData", void 0);
PieChartComponent = __decorate([
    core_1.Component({
        selector: 'q-chart',
        templateUrl: 'app/templates/pie-chart.component.html'
    }),
    __metadata("design:paramtypes", [])
], PieChartComponent);
exports.PieChartComponent = PieChartComponent;
//# sourceMappingURL=pieChart.component.js.map