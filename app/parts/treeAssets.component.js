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
var router_1 = require("@angular/router");
var TreeAssetsComponent = (function () {
    function TreeAssetsComponent(router) {
        this.router = router;
        this.assets = [];
    }
    TreeAssetsComponent.prototype.ngOnInit = function () {
    };
    TreeAssetsComponent.prototype.ngOnDestroy = function () {
        this.assets = [];
    };
    TreeAssetsComponent.prototype.addMaterial = function (assetID) {
        var link = ['/material/nuevo', { id: assetID, type: 'archivo' }];
        this.router.navigate(link);
    };
    TreeAssetsComponent.prototype.addSubFolder = function (assetID) {
        var link = ['/material/nuevo', { id: assetID, type: 'carpeta' }];
        this.router.navigate(link);
    };
    return TreeAssetsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TreeAssetsComponent.prototype, "assets", void 0);
TreeAssetsComponent = __decorate([
    core_1.Component({
        selector: 'tree-assets',
        templateUrl: 'app/templates/tree-assets.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], TreeAssetsComponent);
exports.TreeAssetsComponent = TreeAssetsComponent;
//# sourceMappingURL=treeAssets.component.js.map