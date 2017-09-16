webpackJsonp([0],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountModule", function() { return AccountModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__account_routing_module__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signin_signin_component__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup_component__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__account_routing_module__["a" /* AccountRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__signin_signin_component__["a" /* SigninComponent */],
                __WEBPACK_IMPORTED_MODULE_4__signup_signup_component__["a" /* SignupComponent */]
            ]
        })
    ], AccountModule);
    return AccountModule;
}());



/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_translate_translate_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin__ = __webpack_require__(159);
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





var SigninComponent = (function (_super) {
    __extends(SigninComponent, _super);
    function SigninComponent(router, authenticationService, translationService) {
        var _this = _super.call(this, router, authenticationService) || this;
        _this.router = router;
        _this.authenticationService = authenticationService;
        _this.translationService = translationService;
        _this.model.username = "admin@gmail.com";
        _this.model.password = "Admin01*";
        return _this;
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();
    };
    SigninComponent = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
            template: __webpack_require__(164)
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_2__services_translate_translate_service__["a" /* TranslateService */]])
    ], SigninComponent);
    return SigninComponent;
}(__WEBPACK_IMPORTED_MODULE_4__signin__["a" /* Signin */]));



/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signin; });
var Signin = (function () {
    function Signin(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.errorMessages = [];
    }
    Signin.prototype.signin = function () {
        var _this = this;
        this.authenticationService.signin(this.model.username, this.model.password)
            .subscribe(function () {
            _this.authenticationService.scheduleRefresh();
            _this.authenticationService.getUserInfo().subscribe(function (userInfo) {
                _this.authenticationService.changeUser(userInfo);
                var redirect = _this.authenticationService.redirectUrl
                    ? _this.authenticationService.redirectUrl
                    : '/home';
                _this.router.navigate([redirect]);
            });
        }, function (error) {
            if (error.body != "") {
                var body = error.json();
                switch (body.error) {
                    case "invalid_grant":
                        _this.errorMessages.push({ description: "Invalid email or password." });
                        break;
                    default:
                        _this.errorMessages.push({ description: "Unexpected error. Try again." });
                }
            }
            else {
                var errMsg = (error.message) ? error.message :
                    error.status ? error.status + " - " + error.statusText : "Server error";
                console.log(errMsg);
                _this.errorMessages.push({ description: "Server error. Try later." });
            }
        });
    };
    Signin.prototype.clearMessages = function () {
        this.errorMessages = [];
    };
    return Signin;
}());



/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_translate_translate_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_identity_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signin__ = __webpack_require__(159);
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






var SignupComponent = (function (_super) {
    __extends(SignupComponent, _super);
    function SignupComponent(router, authenticationService, identityService, translationService) {
        var _this = _super.call(this, router, authenticationService) || this;
        _this.router = router;
        _this.authenticationService = authenticationService;
        _this.identityService = identityService;
        _this.translationService = translationService;
        return _this;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();
    };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this.identityService.create(this.model)
            .subscribe(function (res) {
            if (res.succeeded) {
                _this.signin();
            }
            else {
                _this.errorMessages = res.errors;
            }
        }, function (error) {
            var errMsg = (error.message) ? error.message :
                error.status ? error.status + " - " + error.statusText : "Server error";
            console.log(errMsg);
            _this.errorMessages.push({ description: "Server error. Try later." });
        });
    };
    SignupComponent = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
            template: __webpack_require__(165)
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_4__services_identity_service__["a" /* IdentityService */],
            __WEBPACK_IMPORTED_MODULE_2__services_translate_translate_service__["a" /* TranslateService */]])
    ], SignupComponent);
    return SignupComponent;
}(__WEBPACK_IMPORTED_MODULE_5__signin__["a" /* Signin */]));



/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin_component__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup_component__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'signin', component: __WEBPACK_IMPORTED_MODULE_2__signin_signin_component__["a" /* SigninComponent */] },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_3__signup_signup_component__["a" /* SignupComponent */] }
];
var AccountRoutingModule = (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());



/***/ }),

/***/ 164:
/***/ (function(module, exports) {

module.exports = "<div class=\"account-card-container\">\r\n\r\n    <md-card>\r\n        <md-toolbar color=\"primary\">{{ 'titleSignin' | translate: [refreshTranslate | async] }}</md-toolbar>\r\n        <md-card-content>\r\n            <form name=\"form\" #f=\"ngForm\" (ngSubmit)=\"f.form.valid && signin()\" novalidate>\r\n                <div>\r\n                    <br />\r\n                    <br />\r\n                    <md-input-container class=\"full-width\">\r\n                        <input type=\"text\" mdInput [(ngModel)]=\"model.username\" name=\"username\" #username=\"ngModel\"\r\n                            placeholder=\"{{ 'formEmail' | translate: [refreshTranslate | async] }}\" (keyup)=\"clearMessages()\" required>\r\n                        <md-error>\r\n                            {{ 'errorMsgRequired' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                    </md-input-container>\r\n                    <br />\r\n                    <br />\r\n                    <md-input-container class=\"full-width\">\r\n                        <input type=\"password\" mdInput [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\"\r\n                            placeholder=\"{{ 'formPassword' | translate: [refreshTranslate | async] }}\" (keyup)=\"clearMessages()\" required>\r\n                        <md-error>\r\n                            {{ 'errorMsgRequired' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                    </md-input-container>\r\n                    <br />\r\n                    <div *ngIf=\"errorMessages.length > 0\" class=\"has-error\">\r\n                        <div *ngFor=\"let errorMessage of errorMessages\">\r\n                            <small>{{ errorMessage.description }}</small>\r\n                        </div>\r\n                    </div>\r\n                    <br />\r\n                </div>\r\n                <div>\r\n                    <button md-raised-button color=\"accent\" type=\"submit\" class=\"full-width\">{{ 'signin' | translate: [refreshTranslate | async] }}</button>\r\n                </div>\r\n            </form>\r\n        </md-card-content>\r\n    </md-card>\r\n\r\n</div>"

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

module.exports = "<div class=\"account-card-container\">\r\n\r\n    <md-card>\r\n        <md-toolbar color=\"primary\">{{ 'titleSignup' | translate: [refreshTranslate | async] }}</md-toolbar>\r\n        <md-card-content>\r\n            <form name=\"form\" #f=\"ngForm\" (ngSubmit)=\"f.form.valid && signup()\" novalidate>\r\n                <div>\r\n                    <br />\r\n                    <br />\r\n                    <md-input-container class=\"full-width\">\r\n                        <input type=\"text\" mdInput [(ngModel)]=\"model.givenName\" name=\"givenName\" #givenName=\"ngModel\"\r\n                            placeholder=\"{{ 'formFirstName' | translate: [refreshTranslate | async] }}\" (keyup)=\"clearMessages()\" required>\r\n                        <md-error>\r\n                            {{ 'errorMsgRequired' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                    </md-input-container>\r\n                    <br />\r\n                    <br />\r\n                    <md-input-container class=\"full-width\">\r\n                        <input type=\"text\" mdInput [(ngModel)]=\"model.familyName\" name=\"familyName\" #familyName=\"ngModel\"\r\n                            placeholder=\"{{ 'formLastName' | translate: [refreshTranslate | async] }}\" (keyup)=\"clearMessages()\" required>\r\n                        <md-error>\r\n                            {{ 'errorMsgRequired' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                    </md-input-container>\r\n                    <br />\r\n                    <br />\r\n                    <md-input-container class=\"full-width\">\r\n                        <input type=\"text\" mdInput [(ngModel)]=\"model.username\" name=\"username\" #username=\"ngModel\"\r\n                            placeholder=\"{{ 'formEmail' | translate: [refreshTranslate | async] }}\" (keyup)=\"clearMessages()\"\r\n                               pattern=\"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$\" required>\r\n                        <md-error *ngIf=\"username.hasError('required')\">\r\n                            {{ 'errorMsgRequired' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                        <md-error *ngIf=\"username.hasError('pattern')\">\r\n                            {{ 'errorMsgInvalidFormat' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                    </md-input-container>\r\n                    <br />\r\n                    <br />\r\n                    <md-input-container class=\"full-width\">\r\n                        <input type=\"password\" mdInput [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\"\r\n                            placeholder=\"{{ 'formPassword' | translate: [refreshTranslate | async] }}\" (keyup)=\"clearMessages()\" required>\r\n                        <md-error>\r\n                            {{ 'errorMsgRequired' | translate: [refreshTranslate | async] }}\r\n                        </md-error>\r\n                    </md-input-container>\r\n                    <br />\r\n                    <div *ngIf=\"errorMessages.length > 0\" class=\"has-error\">\r\n                        <div *ngFor=\"let errorMessage of errorMessages\">\r\n                            <small>{{ errorMessage.description }}</small>\r\n                        </div>\r\n                    </div>\r\n                    <br />\r\n                </div>\r\n                <div>\r\n                    <button md-raised-button color=\"accent\" type=\"submit\" class=\"full-width\">{{ 'signup' | translate: [refreshTranslate | async] }}</button>\r\n                </div>\r\n            </form>\r\n        </md-card-content>\r\n    </md-card>\r\n\r\n</div>"

/***/ })

});
//# sourceMappingURL=0.chunk.js.map