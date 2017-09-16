webpackJsonp([2],{

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_routing_module__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_component__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__dashboard_routing_module__["a" /* DashboardRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__dashboard_component__["a" /* DashboardComponent */]
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* unused harmony export UsersDataSource */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_cdk__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_translate_translate_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_identity_service__ = __webpack_require__(63);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(identityService, translationService) {
        this.identityService = identityService;
        this.translationService = translationService;
        this.displayedColumns = ['email', 'givenName', 'familyName', 'actions'];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();
        this.identityService.getAll();
        this.dataSource = new UsersDataSource(this.identityService);
    };
    DashboardComponent.prototype.delete = function (username) {
        this.identityService.delete(username);
    };
    DashboardComponent = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
            template: __webpack_require__(170),
            styles: [__webpack_require__(171)]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_identity_service__["a" /* IdentityService */],
            __WEBPACK_IMPORTED_MODULE_2__services_translate_translate_service__["a" /* TranslateService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());

var UsersDataSource = (function (_super) {
    __extends(UsersDataSource, _super);
    function UsersDataSource(identityService) {
        var _this = _super.call(this) || this;
        _this.identityService = identityService;
        return _this;
    }
    UsersDataSource.prototype.connect = function () {
        return this.identityService.users;
    };
    UsersDataSource.prototype.disconnect = function () {
    };
    return UsersDataSource;
}(__WEBPACK_IMPORTED_MODULE_1__angular_cdk__["o" /* DataSource */]));



/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_guard__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */], pathMatch: 'full', canActivate: [__WEBPACK_IMPORTED_MODULE_3__services_auth_guard__["a" /* AuthGuard */]] }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ 170:
/***/ (function(module, exports) {

module.exports = "<h1>{{ 'titleDashboard' | translate: [refreshTranslate | async] }}</h1>\r\n\r\n<div class=\"dashboard-container\">\r\n\r\n    <md-table #table [dataSource]=\"dataSource\" class=\"mat-elevation-z2\">\r\n        <ng-container cdkColumnDef=\"email\">\r\n            <md-header-cell *cdkHeaderCellDef> {{ 'headerEmail' | translate: [refreshTranslate | async] }} </md-header-cell>\r\n            <md-cell *cdkCellDef=\"let row\"> {{ row.email }} </md-cell>\r\n        </ng-container>\r\n\r\n        <ng-container cdkColumnDef=\"givenName\">\r\n            <md-header-cell *cdkHeaderCellDef> {{ 'headerGivenName' | translate: [refreshTranslate | async] }} </md-header-cell>\r\n            <md-cell *cdkCellDef=\"let row\"> {{ row.givenName }} </md-cell>\r\n        </ng-container>\r\n\r\n        <ng-container cdkColumnDef=\"familyName\">\r\n            <md-header-cell *cdkHeaderCellDef> {{ 'headerFamilyName' | translate: [refreshTranslate | async] }} </md-header-cell>\r\n            <md-cell *cdkCellDef=\"let row\"> {{ row.familyName }} </md-cell>\r\n        </ng-container>\r\n\r\n        <ng-container cdkColumnDef=\"actions\">\r\n            <md-header-cell *cdkHeaderCellDef> </md-header-cell>\r\n            <md-cell *cdkCellDef=\"let row\">\r\n                <button md-icon-button color=\"warn\" (click)=\"delete(row.userName)\"\r\n                    md-tooltip=\"{{ 'tooltipDelete' | translate: [refreshTranslate | async] }}\" tooltip-position=\"above\">\r\n                    <md-icon>delete</md-icon>\r\n                </button>\r\n            </md-cell>\r\n        </ng-container>\r\n\r\n        <md-header-row *cdkHeaderRowDef=\"displayedColumns\"></md-header-row>\r\n        <md-row *cdkRowDef=\"let row; columns: displayedColumns;\"></md-row>\r\n    </md-table>\r\n\r\n</div>"

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = ".dashboard-container {\n  display: flex;\n  flex-direction: column; }\n  .dashboard-container .mat-table {\n    overflow: hidden; }\n"

/***/ })

});
//# sourceMappingURL=2.chunk.js.map