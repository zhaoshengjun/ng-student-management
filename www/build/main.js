webpackJsonp([0],{

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingPage = (function () {
    function LoadingPage(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
    }
    LoadingPage.prototype.show = function () {
        this.loading = this.loadingCtrl.create({
            spinner: "crescent",
            content: "Please wait..."
        });
        this.loading.present();
    };
    LoadingPage.prototype.hide = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
    };
    return LoadingPage;
}());
LoadingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-loading',template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\loading\loading.html"*/'<div class="container" [ngClass]="{\'busy\': isBusy}">\n  <div class="backdrop"></div>\n  <ion-spinner></ion-spinner>\n</div>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\loading\loading.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], LoadingPage);

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__share_data_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__share_data_model__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StudentModalPage = (function () {
    function StudentModalPage(viewCtrl, dbService, navParams) {
        this.viewCtrl = viewCtrl;
        this.dbService = dbService;
        this.navParams = navParams;
        this.confirmTitle = "confirm";
        this.isArchived = false;
        this.student = new __WEBPACK_IMPORTED_MODULE_1__share_data_model__["a" /* Student */];
        this.mode = "add";
        var title = this.navParams.get("confirmTitle");
        if (title)
            this.confirmTitle = title;
        var studentID = this.navParams.get("studentId");
        if (studentID) {
            this.studentId = studentID;
            this.student = this.dbService.getStudentById(this.studentId);
            this.mode = "edit";
        }
        // if student has been archived, the UI should reflect this
        // e.g. a darker color or a ribbon on the title.
        this.isArchived = this.student.status == 'achived';
    }
    StudentModalPage.prototype.clickedAvatar = function () {
        console.log('needs to change avatar');
        // access the photo lib to change the avatar. 
        // this can be saved to the database.
    };
    StudentModalPage.prototype.onConfirm = function () {
        // should update/add the student data
        // delete/archive will be performed in the list view instead of this detail view
        // for unarchived student, there's archive option
        // for archived student, there's unarchive option
        if (this.mode = "add") {
            this.dbService.addStudent(this.student);
        }
        else {
            // this.dbService.updateStudentInfo(this.student.$key, newVal)
        }
    };
    StudentModalPage.prototype.onCancel = function () {
        this.viewCtrl.dismiss();
    };
    return StudentModalPage;
}());
StudentModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: "page-student-modal",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\student-modal\student-modal.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Student Info\n    </ion-title>\n\n    <ion-buttons start>\n      <button ion-button (click)="onCancel()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding [class.dark]="isArchived">\n  <ion-item>\n    <ion-avatar (click)="clickedAvatar()">\n      <img src="/assets/images/unknown.png">\n      <button ion-button class="inside-middle">Change</button>\n    </ion-avatar>\n\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Full Name\n    </ion-label>\n    <ion-input type="text" [(ngModel)]="student.name" placeholder="Full Name"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      University\n    </ion-label>\n    <ion-select name="">\n      <ion-option>\n        QUT\n      </ion-option>\n      <ion-option>\n        UQ\n      </ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Email\n    </ion-label>\n    <ion-input type="email" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Phone\n    </ion-label>\n    <ion-input type="tel" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Start Date\n    </ion-label>\n    <ion-input type="date" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Room No.\n    </ion-label>\n    <ion-input type="number" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Comments\n    </ion-label>\n    <ion-textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet quos vero sequi consequatur voluptate id, impedit sed quis doloribus. Dolore."></ion-textarea>\n  </ion-item>\n  <ion-item>\n    <button ion-button color="positive" icon-left (click)="onAddHoliday()">\n        <ion-icon name="plane"></ion-icon>\n        Add Holiday Period\n      </button>\n    <button ion-button color="positive" icon-left (click)="onAddGuardian()">\n          <ion-icon name="plane"></ion-icon>\n          Add Guidian Info\n        </button>\n  </ion-item>\n\n  <div class="equal-box">\n    <button ion-button color="positive" icon-left class="equal-item" (click)="onSave()">\n      <ion-icon name="checkmark-circle"></ion-icon>\n      Save\n    </button>\n    <button ion-button color="assertive" icon-left class="equal-item" (click)="onCancel()">\n      <ion-icon name="close"></ion-icon>\n      Cancel\n    </button>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\student-modal\student-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0__share_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */]])
], StudentModalPage);

//# sourceMappingURL=student-modal.js.map

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 232;

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__student_modal_student_modal__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingPage = (function () {
    function SettingPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
    }
    SettingPage.prototype.onAdd = function () {
        // show add modal
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__student_modal_student_modal__["a" /* StudentModalPage */], {});
        modal.present();
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-setting",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\setting\setting.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Setting\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-button (click)="onAdd()">Add</button>\n    <p>List all the students with a special class for the archived ones</p>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\setting\setting.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* ModalController */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReportPage = (function () {
    function ReportPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return ReportPage;
}());
ReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "page-report",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\report\report.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Report\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\report\report.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], ReportPage);

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LodgePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_loading__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__share_data_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_date_fns__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Student } from "./../../share";
// import { LoginPage } from "./../login/login";







// when user logged in, the app should check if there's a today's list already exists
//  if yes, use the list. otherwise, generate the list, save it and use it
//  OR: use ListService to get the list and all the logic is inside the ListService
//  only submit to LogedList/UnlogedList and let the UI react to the data when changing.
var LodgePage = (function () {
    function LodgePage(navCtrl, loadingCtrl, afDB, afAuth, dbService, _app) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.afDB = afDB;
        this.afAuth = afAuth;
        this.dbService = dbService;
        this._app = _app;
        this.selectedSegment = "unlodged";
        this.db = this.afDB.database;
    }
    LodgePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = new __WEBPACK_IMPORTED_MODULE_3__loading_loading__["a" /* LoadingPage */](this.loadingCtrl);
        this.selectedDate = new Date();
        this.dateString = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(this.selectedDate, "YYYYMMDD");
        this.userId = this.dbService.uid;
        var todayRef = "/" + this.userId + "/lodgelists/" + this.dateString;
        var listRef = this.afDB.list(todayRef);
        var fetchStudentInfo = function (stu, cb) {
            var stuRef = _this.db.ref().child("/" + _this.userId + "/students/" + stu.studentId);
            stuRef.once("value", cb);
        };
        this.wholeList = listRef.map(function (snap) {
            if (snap.length == 0) {
                // this is the 1st time to use for today.
                // should generate a list
                _this.generateList();
            }
            else {
                // list already exists.
                var list_1 = [];
                snap.forEach(function (stu) {
                    // console.log('stu:', stu);
                    fetchStudentInfo(stu, function (data) {
                        // console.log("fetch:", data.val());
                        var stud = data.val();
                        var student = Object.assign(stud, {
                            lodgeStatus: stu.lodgeStatus,
                            reason: stu.reason
                        });
                        // console.log('generate info: ', student);
                        list_1.push(student);
                    });
                });
                return list_1;
            }
            ;
        });
        this.site = this.afDB.object("/" + this.userId + "/site");
        this.wholeList.subscribe(function (d) {
            console.log("whole list", d);
            // if (d && d.length > 0) {
            // d.forEach(s => {
            //   console.log("object inside list:", s);
            // })
            // }
        });
    };
    LodgePage.prototype.generateList = function () {
        // get full students list
        var _this = this;
        var studentRefString = "/" + this.userId + "/students";
        var studentRef = this.db.ref(studentRefString);
        // let studentsRef = this.afDB.list(studentRefString);
        // check each of them should be lodged
        var lodgeListRefString = "/" + this.userId + "/lodgelists/" + this.dateString;
        var lodgeListRef = this.db.ref(lodgeListRefString);
        // let lodgeListRef = this.afDB.list(lodgeListRefString);
        var listRef = this.afDB.database.ref(lodgeListRefString);
        studentRef.once('value', function (snap) {
            console.log(snap.val());
            var students = snap.val();
            var lodgeList = [];
            students
                .filter(function (s) { return s.status === 'active'; })
                .forEach(function (s) {
                console.log("student:", s, "key:", s.id);
                var _a = _this.checkIfNeedToLodge(s), reason = _a.reason, status = _a.status;
                var lodgeInfo = {
                    studentId: s.id,
                    lodgeStatus: status,
                    reason: reason
                };
                console.log('lodgeInfo:', lodgeInfo);
                lodgeList.push(lodgeInfo);
            });
            listRef.update(lodgeList);
        });
    };
    LodgePage.prototype.checkIfNeedToLodge = function (student) {
        var reason = "";
        var status = "unlodged";
        var holidays = student.holidayPeriods;
        if (holidays && holidays.length > 0) {
            for (var i = 0; i < holidays.length; i++) {
                var holiday = holidays[i];
                if (Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["isWithinRange"])(this.selectedDate, holiday.startDate, holiday.endDate)) {
                    reason = "InHoliday";
                    status = "lodged";
                    break;
                }
            }
        }
        return { reason: reason, status: status };
    };
    LodgePage.prototype.onLogout = function () {
        var root = this._app.getRootNavs()[0];
        root.popToRoot();
    };
    LodgePage.prototype.onSegmentChanged = function (newVal) {
        this.selectedSegment = newVal;
        console.log(this.selectedSegment);
    };
    LodgePage.prototype.onSignIn = function (student) {
        console.log("Sign in with :", student);
        // should show sign in form to collect signature
        //  and save it to the database
    };
    LodgePage.prototype.onText = function (student) {
        console.log("Text with :", student);
        //  Text student 
    };
    LodgePage.prototype.onCall = function (student) {
        console.log("Call with :", student);
        //  Call student 
    };
    LodgePage.prototype.onEmail = function (student) {
        console.log("Email with :", student);
        //  Email student 
    };
    return LodgePage;
}());
LodgePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-lodge",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge\lodge.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Lodge</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="onLogout()">\n        Logout\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <h1 center>{{today}}</h1>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="selectedSegment">\n      <ion-segment-button value="unlodged">\n        Sign In\n      </ion-segment-button>\n      <ion-segment-button value="lodged">\n        Already Signed In\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n  <!-- <div>\n    <span>\n        wholeList: {{wholeList | async |json}}\n      </span>\n  </div> -->\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list *ngIf="wholeList">\n    <ion-item-sliding *ngFor="let item of wholeList | async" [class.hide]="item.lodgeStatus !== selectedSegment ">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="/assets/images/unknown.png">\n        </ion-avatar>\n        <h2>{{item.name}}</h2>\n        <p> {{item.roomNo}} </p>\n        <p> {{item.email}} </p>\n        <p> {{item.lodgeStatus}} </p>\n        <p> {{item.id}} </p>\n        <p> {{item.email}} </p>\n      </ion-item>\n      <ion-item-options side="left">\n        <button ion-button color="primary" (click)="onText(item)">\n                <ion-icon name="text"></ion-icon>\n                Text\n              </button>\n        <button ion-button color="secondary" (click)="onCall(item)">\n                <ion-icon name="call"></ion-icon>\n                Call\n              </button>\n        <button ion-button color="primary" (click)="onEmail(item)">\n                  <ion-icon name="mail"></ion-icon>\n                  Email \n                </button>\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="onSignIn(item)">\n                <ion-icon name="mail"></ion-icon>\n                SignIn\n              </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge\lodge.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__share_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__share_data_service__["a" /* DataService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */]) === "function" && _f || Object])
], LodgePage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=lodge.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.user = {
            email: "",
            password: "",
            site: ""
        };
    }
    SignupPage.prototype.onSubmit = function (user) {
        // validate first
        // though user info has been posted to firebase, no user data can be accessed yet.
        this.af.auth
            .createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then(function (data) {
            // should disable user before manuall verificiation has been confirmed.
            console.log(data);
            //the page doesn't auto refresh, so we can show the message.
        }, function (err) {
            // show error message
            console.log(err);
        })
            .catch(function (err) { });
    };
    SignupPage.prototype.onCancel = function () {
        this.navCtrl.pop();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "page-signup",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list inset>\n    <ion-item>\n      <ion-label>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="user.email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button ion-button (click)="onSubmit(user)">Submit</button>\n  <button ion-button (click)="onCancel()">Cancel</button>\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\signup\signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, navParams, afAuth) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.user = {
            email: "a@a.com",
            password: "111111",
            site: ""
        };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.onLogin = function () {
        var _this = this;
        var loader = new __WEBPACK_IMPORTED_MODULE_5__loading_loading__["a" /* LoadingPage */](this.loadingCtrl);
        loader.show();
        this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(function (res) {
            loader.hide();
            console.log(res);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            loader.hide();
            console.log(err);
            // show error message
        });
    };
    LoginPage.prototype.onSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__signup_signup__["a" /* SignupPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: "page-login",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\login\login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list inset>\n    <ion-item>\n      <ion-label>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="user.email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button ion-button outline color="secondary" (click)="onLogin()">Login</button>\n  <button ion-button outline color="danger" (click)="onSignup()">Signup</button>\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__report_report__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setting_setting__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lodge_lodge__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__lodge_lodge__["a" /* LodgePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_0__report_report__["a" /* ReportPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__setting_setting__["a" /* SettingPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Lodge" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Report" tabIcon="document"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Setting" tabIcon="settings"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(297);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_student_modal_student_modal__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_setting_setting__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_report_report__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_lodge_lodge__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_loading_loading__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__share_data_service__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var firebaseConfig = {
    apiKey: "AIzaSyCETsqdUtSsWkz4oCP8_EsM3mbeDlfscKQ",
    authDomain: "unilodge-6fd12.firebaseapp.com",
    databaseURL: "https://unilodge-6fd12.firebaseio.com",
    projectId: "unilodge-6fd12",
    storageBucket: "unilodge-6fd12.appspot.com",
    messagingSenderId: "550368336024"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_lodge_lodge__["a" /* LodgePage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_report_report__["a" /* ReportPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_student_modal_student_modal__["a" /* StudentModalPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_loading_loading__["a" /* LoadingPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {
                iconMode: "md",
                pageTransition: "md-transition"
            }),
            __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_lodge_lodge__["a" /* LodgePage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_report_report__["a" /* ReportPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_student_modal_student_modal__["a" /* StudentModalPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_loading_loading__["a" /* LoadingPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_6__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_18__share_data_service__["a" /* DataService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDateString;
/* unused harmony export convertFirebaseObject */
function getDateString(d) {
    if (d === void 0) { d = new Date(); }
    var day = d.getDate() - 1;
    var month = d.getMonth() + 1;
    var dayStr = day < 10 ? "0" + day.toString() : day.toString();
    var monthStr = month < 10 ? "0" + month.toString() : month.toString();
    return "" + d.getFullYear() + monthStr + dayStr;
}
function convertFirebaseObject(obj, key) {
    return Object.assign({ key: key }, obj);
}
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Student; });
var Student = (function () {
    function Student() {
        this.name = "Full name";
        this.roomNo = "";
        this.photo = "101";
        this.university = "UQ";
        this.phone = "123-456-7890";
        this.email = "abc@email.com";
        this.startDate = new Date();
        this.endDate = new Date();
        this.dateOfBirth = new Date();
        this.holidayPeriods = [];
        this.comments = "";
        this.guardianName = "Guardian name";
        this.guardianPhone = "123-456-7890";
        this.guardianEmail = "abc@email.com";
        this.status = "active";
    }
    return Student;
}());

//# sourceMappingURL=model.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(358);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataService = (function () {
    function DataService(afAuth, afDB) {
        var _this = this;
        this.afAuth = afAuth;
        this.afDB = afDB;
        afAuth.authState.subscribe(function (user) {
            _this.uid = user.uid;
        });
    }
    DataService.prototype.convertFirebaseObject = function (obj, key) {
        return Object.assign({ key: key }, obj);
    };
    // students api
    DataService.prototype.checkLoginStatus = function () {
        if (!this.uid) {
            var user = this.afAuth.auth.currentUser;
            if (user) {
                this.uid = user.uid;
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    DataService.prototype.retriveData = function () {
        var _this = this;
        if (this.checkLoginStatus()) {
            var today = Object(__WEBPACK_IMPORTED_MODULE_3__common__["a" /* getDateString */])();
            this.afDB
                .list("/" + this.uid + "/students", { preserveSnapshot: true })
                .subscribe(function (snapshot) {
                console.log("Getting students snapshot:", snapshot);
                var stuTemp = [];
                snapshot.forEach(function (s) {
                    stuTemp.push(_this.convertFirebaseObject(s.val(), s.key));
                });
                _this.students = stuTemp;
            });
            this.afDB
                .list("/" + this.uid + "/lodgelists/" + today, { preserveSnapshot: true })
                .subscribe(function (snapshot) {
                console.log("Getting lodgelists", snapshot);
                _this.lodgelist = snapshot;
            });
        }
    };
    DataService.prototype.getStudents = function () {
        var _this = this;
        if (!this.students) {
            this.retriveData();
        }
        return new Promise(function (res, rej) {
            if (_this.students) {
                res(_this.students);
            }
            else {
                rej("No data found");
            }
        });
    };
    DataService.prototype.getStudentById = function (id) {
        return this.students[0];
        // return this.students.filter( s => s.$key === id);
    };
    DataService.prototype.updateStudentInfo = function (studentId, newVal) {
        // 1. update based on new value;
        // 2. if holiday period has been updated, needs to check the lodge list as well
        // return this.students
        // .update(studentId, newVal)
    };
    DataService.prototype.addStudent = function (student) {
        // 1. add to students
        // 2. check if he/she needs to be lodged on today's list.
        // return this.students.push(student);
    };
    DataService.prototype.archiveStudent = function (studentId) {
        // return this.students.update(studentId, {
        //   archived: true,
        //   archivedDate: new Date()
        // })
    };
    // lodge list api
    DataService.prototype.getList = function (ref) {
        // if (this.uid) {
        //   if (!this.lodgelist) {
        //     // user has signed in and there's no lodgelist
        //     //  we build a new one
        //     this.buildLodgeList();
        //   }
        // }
        if (this.checkLoginStatus()) {
            return this.afDB.list(ref, {
                preserveSnapshot: true
            });
        }
        else {
            return null;
        }
    };
    DataService.prototype.buildLodgeList = function () { };
    return DataService;
}());
DataService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__["a" /* AngularFireDatabase */]])
], DataService);

//# sourceMappingURL=data-service.js.map

/***/ })

},[282]);
//# sourceMappingURL=main.js.map