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
var PieChartComponent = (function () {
    function PieChartComponent() {
        this.pieChartTitle = 'Votaciones';
        this.pieChartType = 'pie';
        this.pieLegend = true;
        this.pieOptions = {
            defaults: {
                global: {
                    title: true
                }
            }
        };
    }
    PieChartComponent.prototype.ngOnInit = function () {
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