webpackJsonp([1],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourcesModule", function() { return ResourcesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_routing_module__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resources_component__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ResourcesModule = (function () {
    function ResourcesModule() {
    }
    ResourcesModule = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__resources_routing_module__["a" /* ResourcesRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__resources_component__["a" /* ResourcesComponent */]
            ]
        })
    ], ResourcesModule);
    return ResourcesModule;
}());



/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourcesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResourcesComponent = (function () {
    function ResourcesComponent(authHttp) {
        this.authHttp = authHttp;
    }
    ResourcesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authHttp.get("/api/values")
            .subscribe(function (res) {
            _this.values = res.json();
        }, function (error) {
            console.log(error);
        });
    };
    ResourcesComponent = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
            template: __webpack_require__(160),
            styles: [__webpack_require__(161)]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], ResourcesComponent);
    return ResourcesComponent;
}());



/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourcesRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resources_component__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_guard__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__resources_component__["a" /* ResourcesComponent */], pathMatch: 'full', canActivate: [__WEBPACK_IMPORTED_MODULE_3__services_auth_guard__["a" /* AuthGuard */]] }
];
var ResourcesRoutingModule = (function () {
    function ResourcesRoutingModule() {
    }
    ResourcesRoutingModule = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], ResourcesRoutingModule);
    return ResourcesRoutingModule;
}());



/***/ }),

/***/ 160:
/***/ (function(module, exports) {

module.exports = "<h1>Web API values</h1>\r\n\r\n<div class=\"resources-card-container\">\r\n\r\n    <md-card *ngFor=\"let value of values\">\r\n        <md-card-content>\r\n            {{ value }}\r\n        </md-card-content>\r\n    </md-card>\r\n\r\n</div>"

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

module.exports = ".resources-card-container {\n  display: flex;\n  flex-direction: column; }\n  .resources-card-container md-card {\n    margin: 8px 0 8px 0;\n    max-width: 400px; }\n"

/***/ })

});
//# sourceMappingURL=1.chunk.js.map