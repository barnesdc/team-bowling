webpackJsonp([1],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        if (!this.isOpen) {
            this.storage = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]();
            this.storage
                .create({
                name: "bowlerData.db",
                location: "default"
            })
                .then(function (db) {
                _this.db = db;
                db.executeSql("CREATE TABLE IF NOT EXISTS bowlers (bowler_id INTEGER PRIMARY KEY AUTOINCREMENT, bowler_name  TEXT, bowler_gender TEXT, bowler_avg INTEGER, bowler_score INTEGER, bowler_handicap TEXT,team_id INTEGER FOREIGN KEY (team_id) references teams(team_id))", []);
                //  db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, identification INTEGER, name TEXT, lastname text)", []);
                _this.isOpen = true;
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        console.log("Hello DatabaseProvider Provider");
    }
    DatabaseProvider.prototype.CreateBowler = function (bowler_name, bowler_gender, bowler_average, bowler_handicap, bowler_score) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage
                .create({ name: "bowlerData.db", location: "default" })
                .then(function () {
                var sql = "INSERT INTO bowlers (bowler_name, bowler_gender, bowler_avg, bowler_handicap, bowler_score) VALUES (?, ?, ?, ?, ?)";
                _this.db
                    .executeSql(sql, [
                    bowler_name,
                    bowler_gender,
                    bowler_average,
                    bowler_handicap,
                    bowler_score
                ])
                    .then(function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    DatabaseProvider.prototype.GetAllBowlers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.executeSql("SELECT * FROM bowlers", []).then(function (data) {
                var arrayBowlers = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        arrayBowlers.push({
                            bowler_id: data.rows.item(i).bowler_id,
                            bowler_name: data.rows.item(i).bowler_name,
                            bowler_gender: data.rows.item(i).bowler_gender,
                            bowler_handicap: data.rows.item(i).bowler_handicap,
                            bowler_average: data.rows.item(i).bowler_average,
                            bowler_score: data.rows.item(i).bowler_score
                        });
                    }
                }
                resolve(arrayBowlers);
            }, function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.DeleteUser = function (bowler_id) { };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__games_scores_games_scores__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__teams_teams__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bowler_profile_bowler_profile__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__information_information__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl) {
        this.navCtrl = navCtrl;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__games_scores_games_scores__["a" /* GamesScoresPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__teams_teams__["a" /* TeamsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__bowler_profile_bowler_profile__["a" /* BowlerProfilePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__information_information__["a" /* InformationPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-tabs",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/tabs/tabs.html"*/'<ion-tabs id="tabs-tabs1">\n  <ion-tab [root]="tab1Root" tabTitle="Games/Scores" tabIcon="grid" id="tabs-tab1"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Teams" tabIcon="people" id="tabs-tab2"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="body" id="tabs-tab3"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="About" tabIcon="information-circle" id="tabs-tab4"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BowlerProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_profile_edit_profile__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { BowlerProfilePage } from "../bowler-profile/bowler-profile";
var BowlerProfilePage = /** @class */ (function () {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    function BowlerProfilePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    BowlerProfilePage.prototype.goToEditProfile = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_profile_edit_profile__["a" /* EditProfilePage */]);
    };
    BowlerProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-bowler-profile",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/bowler-profile/bowler-profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Bowler Profile\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page4">\n  <ion-card id="bowlerProfile-card22">\n    <ion-list>\n      <ion-item color="none" id="bowlerProfile-list-item7">\n        <ion-avatar item-left>\n          <img src="../../assets/imgs/adult-beach-beard-736716.png">\n        </ion-avatar>\n\n      </ion-item>\n      <ion-item>\n        <ion-label>John Doe</ion-label>\n\n      </ion-item>\n      <ion-item id="bowlerProfile-list-item-container4">\n        <div id="bowlerProfile-markdown4" class="show-list-numbers-and-dots">\n          <p style="margin-top:0px;color:#000000;">\n            Some friendly\n            <strong>\n              markdown\n            </strong>\n            <br />\n            <strong>\n              put a form here and include:\n            </strong>\n            <br /> Average: [bowler.average]\n            <br /> High: [bowler.high]\n            <br /> Handicap: [if n/a, put n/a; some number]\n            <br /> Handicap level: [use either this or actual]\n            <br /> Gender: [male or female]\n          </p>\n        </div>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n\n  <button id="bowlerProfile-button5" ion-button color="positive" block on-click="goToEditProfile()">\n    <ion-icon name="more"></ion-icon>\n    Edit\n  </button>\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/bowler-profile/bowler-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], BowlerProfilePage);
    return BowlerProfilePage;
}());

//# sourceMappingURL=bowler-profile.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TeamsPage = /** @class */ (function () {
    function TeamsPage(alertCtrl, navCtrl, navParams, database) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
    }
    TeamsPage.prototype.ionViewDidLoad = function () {
        this.GetAllUser();
    };
    TeamsPage.prototype.ionViewWillEnter = function () {
        this.GetAllUser();
    };
    TeamsPage.prototype.GetAllUser = function () {
        var _this = this;
        this.database.GetAllBowlers().then(function (data) {
            console.log(data + "I AM WORKING");
            _this.ListBowler = data;
            window.alert("I am working");
        }, function (error) {
            console.log(error);
        });
    };
    TeamsPage.prototype.DeleteUser = function (bowler_id) {
        console.log(bowler_id);
    };
    TeamsPage.prototype.AddBowlerPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Add Bowler",
            message: "Fill out the following boxes to enter your bowler",
            inputs: [
                {
                    name: "Name",
                    placeholder: "Bowler name"
                },
                {
                    name: "Handicap",
                    placeholder: "Handicap (Ex. A, B or C)"
                },
                {
                    name: "Gender",
                    placeholder: "Gender (Ex. Male/Female)"
                },
                {
                    name: "AverageScore",
                    placeholder: "Average Score (Ex. 200)"
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) {
                        console.log("Cancel clicked");
                    }
                },
                {
                    text: "Save",
                    handler: function (data) {
                        console.log(JSON.stringify(data));
                        _this.database.CreateBowler(data.Name, data.Handicap, data.gender, data.AverageScore, data.Score);
                    }
                }
            ]
        });
        prompt.present();
    };
    TeamsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-teams",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/teams/teams.html"*/'<!--\n  Generated template for the TeamsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Teams</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding id="page3">\n  <h2>The Bowlers currently include: </h2><br>\n  <hr>\n  <button ion-button block on-click="GetAllUser()"> List Bowlers</button>\n\n  <ion-list id="bowlers-list6">\n    <ion-item-sliding *ngFor="let bowler of ListBowler" #item>\n      <ion-item id="bowlers-list-item-container6">\n        <h3>{{bowler.name}}</h3>\n      </ion-item>\n    </ion-item-sliding>\n  </ion-list>\n  <button ion-button block on-click="AddBowlerPrompt()"> Add a Bowler</button>\n\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/teams/teams.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], TeamsPage);
    return TeamsPage;
}());

//# sourceMappingURL=teams.js.map

/***/ }),

/***/ 195:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 195;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/teams/teams.module": [
		514,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 237;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_database__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// interface user {
//   email: string;
//   password: string;
// }
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, alertCtrl, database) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.database = database;
        this.splash = true;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.splash = false;
        }, 3000);
    };
    LoginPage.prototype.createUser = function () { };
    LoginPage.prototype.goToTabs = function (params) {
        if (!params)
            params = {};
        // this.database.CreateBowler("John", "Male", 300, "A", null, 1);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
    };
    LoginPage.prototype.goToSignup = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.signOut = function () { };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-login",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Login\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page6">\n  <div id="custom-overlay" [style.display]="splash ? \'flex\':\'none\'">\n    <div class="flb">\n      <div class="Aligner-item Aligner-item--top"></div>\n      <img src="https://media.giphy.com/media/l0HlW6GBSjbyFDCW4/giphy.gif">\n      <div class="Aligner-item Aligner-item--bottom"></div>\n    </div>\n  </div>\n  <form id="login-form1">\n    <img src="../../assets/imgs/bowl-pins.png" style="display:block;width:160px;height:auto;margin-left:auto;margin-right:auto;" />\n    <div class="spacer" style="height:40px;" id="login-spacer4"></div>\n    <ion-list id="login-list1">\n      <ion-item id="login-input1">\n        <ion-label>\n          Email\n        </ion-label>\n        <!-- <ion-input type="email" placeholder="" [(ngModel)]="bowler.email"></ion-input> -->\n      </ion-item>\n      <ion-item id="login-input2">\n        <ion-label>\n          Password\n        </ion-label>\n        <!-- <ion-input type="password" placeholder="" [[ngModel]]="bowler.password"></ion-input> -->\n      </ion-item>\n    </ion-list>\n    <div class="spacer" style="height:40px;" id="login-spacer1"></div>\n    <!-- <button id="login-button1" ion-button color="stable" block on-click="signInWithEmail()"> -->\n    <button id="login-button1" ion-button color="stable" block on-click="goToTabs()">\n\n      Log in\n    </button>\n    <button id="login-button2" ion-button clear color="positive" block on-click="goToSignup()">\n      Create an account\n    </button>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_database_database__["a" /* DatabaseProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    // createUserWithEmail() {
    //   firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(this.email, this.password)
    //     .catch(function(error) {
    //       //handle error here
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       if (errorCode == "auth/email-already-in-use") {
    //         alert("This email is already in use.");
    //       } else {
    //         alert(errorMessage);
    //       }
    //       console.log(error);
    //     });
    // }
    SignupPage.prototype.test = function () {
        window.alert("Working on this feature");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-signup",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Signup\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page7">\n  <form id="signup-form2">\n    <!-- <div style="width:100%;height:220px;margin:0px 0px;line-height:250px;background-color:#e8ebef;text-align:center;">\n      <i class="icon ion-image" style="font-size:64px;color:#888;vertical-align:middle;"></i>\n    </div>\n    <div style="width:100%;height:220px;margin:0px 0px;line-height:250px;background-color:#e8ebef;text-align:center;">\n      <i class="icon ion-image" style="font-size:64px;color:#888;vertical-align:middle;"></i>\n    </div> -->\n    <img src="../../assets/imgs/bowl-pins.png" style="display:block;width:160px;height:auto;margin-left:auto;margin-right:auto;" />\n    <div class="spacer" style="height:40px;" id="signup-spacer2"></div>\n    <ion-list id="signup-list2">\n      <ion-item id="signup-input3">\n        <ion-label>\n          Name\n        </ion-label>\n        <ion-input type="text" placeholder=""></ion-input>\n      </ion-item>\n      <ion-item id="signup-input4">\n        <ion-label>\n          Email\n        </ion-label>\n        <ion-input type="email" placeholder=""></ion-input>\n      </ion-item>\n      <ion-item id="signup-input5">\n        <ion-label>\n          Password\n        </ion-label>\n        <ion-input type="text" placeholder=""></ion-input>\n      </ion-item>\n    </ion-list>\n    <div class="spacer" style="height:40px;" id="signup-spacer3"></div>\n    <!-- <button id="signup-button3" ion-button color="stable" block on-click="createUserWithEmail()"> -->\n    <button id="signup-button3" ion-button color="stable" block on-click="test()">\n\n      Sign up\n    </button>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamesScoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GamesScoresPage = /** @class */ (function () {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    function GamesScoresPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    GamesScoresPage.prototype.startGame = function () {
        window.alert("This feature is coming soon");
    };
    GamesScoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-games-scores",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/games-scores/games-scores.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Games Scores\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page2">\n  <button id="startGame-button1" ion-button color="stable" block on-click="startGame()">\n    Start A Game\n  </button>\n  <hr>\n\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/games-scores/games-scores.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], GamesScoresPage);
    return GamesScoresPage;
}());

//# sourceMappingURL=games-scores.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bowler_profile_bowler_profile__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { EditProfilePage } from '../edit-profile/edit-profile';
var EditProfilePage = /** @class */ (function () {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    function EditProfilePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    EditProfilePage.prototype.goToBowlerProfile = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__bowler_profile_bowler_profile__["a" /* BowlerProfilePage */]);
    };
    EditProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-edit-profile",template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/edit-profile/edit-profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Edit Profile\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page5">\n  <ion-card id="editProfile-card21">\n    <ion-list>\n      <ion-item color="none" id="editProfile-list-item3">\n        <ion-avatar item-left>\n          <img />\n        </ion-avatar>\n        <h2>\n          [bowler.name]\n        </h2>\n      </ion-item>\n      <div style="width:100%;height:220px;margin:0px 0px;line-height:250px;background-color:#e8ebef;text-align:center;">\n        <i class="icon ion-image" style="font-size:64px;color:#888;vertical-align:middle;"></i>\n      </div>\n      <ion-item id="editProfile-list-item-container2">\n        <div id="editProfile-markdown2" class="show-list-numbers-and-dots">\n          <p style="margin-top:0px;color:#000000;">\n            Some friendly\n            <strong>\n              markdown\n            </strong>\n            <br />\n            <strong>\n              put a form here and include:\n            </strong>\n            <br /> Average: [bowler.average]\n            <br /> High: [bowler.high]\n            <br /> Handicap: [if n/a, put n/a; some number]\n            <br /> Handicap level: [use either this or actual]\n            <br /> Gender: [male or female]\n          </p>\n        </div>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n  <button id="editProfile-button4" ion-button color="positive" block on-click="goToBowlerProfile()">\n    Save\n  </button>\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/edit-profile/edit-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], EditProfilePage);
    return EditProfilePage;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InformationPage = /** @class */ (function () {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    function InformationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    InformationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-information',template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/information/information.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Information\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page8">\n  <h2 id="information-heading1" style="color:#000000;">\n    Senior Project 2018\n  </h2>\n  <img src="../../assets/imgs/ ncat.jpg">\n  <div id="information-markdown5" class="show-list-numbers-and-dots">\n    <p style="color:#000000;">\n      Some friendly\n      <strong>\n        markdown\n      </strong>\n      <br /> This project was created by:\n    </p>\n    <p style="color:#000000;">\n      <strong>\n        D&#39;Ante Barnes\n        <br /> Charles Carrington\n        <br /> Mathew Trotter\n      </strong>\n    </p>\n    <p style="color:#000000;">\n      The goal was to build an application that would benefit bowlers.\n    </p>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/pages/information/information.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], InformationPage);
    return InformationPage;
}());

//# sourceMappingURL=information.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(420);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_games_scores_games_scores__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_teams_teams__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_bowler_profile_bowler_profile__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_edit_profile_edit_profile__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_information_information__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_firestore__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_auth_service_auth_service__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__config__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_sqlite__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_toast__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_database_database__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_http__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// firebase imports


 // authentication
 // user info, data dictionary
 // database






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_games_scores_games_scores__["a" /* GamesScoresPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_teams_teams__["a" /* TeamsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_bowler_profile_bowler_profile__["a" /* BowlerProfilePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_information_information__["a" /* InformationPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/teams/teams.module#TeamsPageModule', name: 'TeamsPage', segment: 'teams', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_14_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_19__config__["a" /* firebaseConfig */].fire),
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__["AngularFireAuthModule"],
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_firestore__["AngularFirestoreModule"].enablePersistence(),
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_23__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_games_scores_games_scores__["a" /* GamesScoresPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_teams_teams__["a" /* TeamsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_bowler_profile_bowler_profile__["a" /* BowlerProfilePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_information_information__["a" /* InformationPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["AngularFireDatabase"],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__["AngularFireAuth"],
                __WEBPACK_IMPORTED_MODULE_18__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_22__providers_database_database__["a" /* DatabaseProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/app/app.html"*/'<!-- <ion-nav [root]="rootPage"></ion-nav> -->\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/dantebarnes/Documents/programming/senior-project/team-bowling/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider() {
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        if (this.bowler.email === null || this.bowler.password === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].throw("Please enter in your login credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
                var access = credentials.password === "pass" && credentials.email === "email";
                // this.currentUser = new Bowler("Dante", "dcbarnes@aggies.ncat.edu");
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
// firebase API key information
var firebaseConfig = {
    fire: {
        apiKey: "AIzaSyBkjK4MXok4pe7HemheEPsQJ2x_miQia6Q",
        authDomain: "bowling-app-b45c0.firebaseapp.com",
        databaseURL: "https://bowling-app-b45c0.firebaseio.com",
        projectId: "bowling-app-b45c0",
        storageBucket: "bowling-app-b45c0.appspot.com",
        messagingSenderId: "49362757433"
    }
};
//# sourceMappingURL=config.js.map

/***/ })

},[306]);
//# sourceMappingURL=main.js.map