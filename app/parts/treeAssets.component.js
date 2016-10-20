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
var angularfire2_1 = require("angularfire2");
var router_1 = require("@angular/router");
var firebase = require("firebase");
var TreeAssetsComponent = (function () {
    function TreeAssetsComponent(router, af) {
        this.router = router;
        this.af = af;
        this.assets = [];
    }
    TreeAssetsComponent.prototype.ngOnInit = function () {
        this.storageRef = firebase.storage().ref();
        this.storage = firebase.storage();
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
    TreeAssetsComponent.prototype.deleteFolder = function (asset) {
        if (window.confirm("¿Desea la carpeta: '" + asset.name + "'?\n Se borraran todas las subcarpetas y archivos dentro de éste.")) {
            this.deleteAssets(asset);
        }
    };
    TreeAssetsComponent.prototype.deleteAssets = function (asset) {
        var _this = this;
        this.af.database.object('assets/' + asset.id).remove();
        if (asset.material.length > 0) {
            asset.material.forEach(function (attach) {
                _this.storage.ref().child('materials/' + attach.name).delete();
                _this.af.database.object('assetsAttachment/' + attach.assetId + '/' + attach.id).remove();
            });
        }
        if (asset.children.length > 0) {
            asset.children.forEach(function (assetChild) {
                _this.deleteAssets(assetChild);
            });
        }
    };
    TreeAssetsComponent.prototype.deleteMaterial = function (attach) {
        if (window.confirm("¿Desea eliminar el archivo: '" + attach.name + "'?")) {
            this.storage.ref().child('materials/' + attach.name).delete();
            this.af.database.object('assetsAttachment/' + attach.assetId + '/' + attach.id).remove();
        }
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
    __metadata("design:paramtypes", [router_1.Router,
        angularfire2_1.AngularFire])
], TreeAssetsComponent);
exports.TreeAssetsComponent = TreeAssetsComponent;
//# sourceMappingURL=treeAssets.component.js.map