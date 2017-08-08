webpackJsonp([0],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(438);
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

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 185;

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__share_data_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__share_data_model__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
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
    }
    StudentModalPage.prototype.ionViewDidLoad = function () {
        var title = this.navParams.get("confirmTitle");
        if (title)
            this.confirmTitle = title;
        var student = this.navParams.get("student");
        if (student) {
            this.mode = "edit";
            this.student = student;
        }
        this.isArchived = this.student.status == 'achived';
        console.log('student', this.student);
        console.log('confirm title:', this.confirmTitle);
    };
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
        selector: "page-student-modal",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\student-modal\student-modal.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Student Info\n    </ion-title>\n\n    <ion-buttons start>\n      <button ion-button (click)="onCancel()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding [class.dark]="isArchived">\n  <ion-item>\n    <ion-avatar (click)="clickedAvatar()">\n      <img src="/assets/images/unknown.png">\n      <button ion-button class="inside-middle">Change</button>\n    </ion-avatar>\n\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Full Name\n    </ion-label>\n    <ion-input type="text" [(ngModel)]="student.name" placeholder="Full Name"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      University\n    </ion-label>\n    <ion-select name="">\n      <ion-option>\n        QUT\n      </ion-option>\n      <ion-option>\n        UQ\n      </ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Email\n    </ion-label>\n    <ion-input type="email" [(ngModel)]="student.email" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Phone\n    </ion-label>\n    <ion-input type="tel" [(ngModel)]="student.phone" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Start Date\n    </ion-label>\n    <ion-input type="date" [(ngModel)]="student.startDate" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      End Date\n    </ion-label>\n    <ion-input type="date" [(ngModel)]="student.endDate" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Room No.\n    </ion-label>\n    <ion-input type="number" [(ngModel)]="student.roomNo" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Guardian Name\n    </ion-label>\n    <ion-input type="text" [(ngModel)]="student.guardianName" placeholder="Full Name"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Guardian Email\n    </ion-label>\n    <ion-input type="email" [(ngModel)]="student.guardianEmail" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Guardian Phone\n    </ion-label>\n    <ion-input type="tel" [(ngModel)]="student.guardianPhone" placeholder=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>\n      Comments\n    </ion-label>\n    <ion-textarea [(ngModel)]="student.comments" placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet quos vero sequi consequatur voluptate id, impedit sed quis doloribus. Dolore."></ion-textarea>\n  </ion-item>\n  <ion-item>\n    <button ion-button color="positive" icon-left (click)="onAddHoliday()">\n        <ion-icon name="plane"></ion-icon>\n        Add Holiday Period\n      </button>\n  </ion-item>\n\n  <div class="equal-box">\n    <button ion-button color="positive" icon-left class="equal-item" (click)="onSave()">\n      <ion-icon name="checkmark-circle"></ion-icon>\n      {{ confirmTitle }}\n    </button>\n    <button ion-button color="assertive" icon-left class="equal-item" (click)="onCancel()">\n      <ion-icon name="close"></ion-icon>\n      Cancel\n    </button>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\student-modal\student-modal.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__share_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__share_data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */]) === "function" && _c || Object])
], StudentModalPage);

var _a, _b, _c;
//# sourceMappingURL=student-modal.js.map

/***/ }),

/***/ 265:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 265;

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__student_modal_student_modal__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__);
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
    function SettingPage(navCtrl, afDB, afAuth, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.afDB = afDB;
        this.afAuth = afAuth;
        this.modalCtrl = modalCtrl;
        this.activeOnly = false;
        this.queryOpts = {};
        this.querySubject = new __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.userId = this.afAuth.auth.currentUser.uid;
        var studentsRefString = "/" + this.userId + "/students";
        this.querySubject.subscribe(function (opts) {
            console.log('options:', opts);
            _this.queryOpts = opts;
            _this.students = _this.afDB.list(studentsRefString, _this.queryOpts);
        });
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        // load all students info
    };
    SettingPage.prototype.updateFilter = function () {
        console.log('activeOnly: ', this.activeOnly);
        if (this.activeOnly) {
            this.querySubject.next({
                query: {
                    orderByChild: "status",
                    equalTo: "active"
                }
            });
        }
        else {
            this.querySubject.next({});
        }
    };
    SettingPage.prototype.onEdit = function (student) {
        console.log('Edit student info: ', student);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__student_modal_student_modal__["a" /* StudentModalPage */], { confirmTitle: "Update", student: student });
        modal.present();
    };
    SettingPage.prototype.onAdd = function () {
        // show add modal
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__student_modal_student_modal__["a" /* StudentModalPage */], {});
        modal.present();
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: "page-setting",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\setting\setting.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Setting\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div>\n    <ion-fab right bottom>\n      <button ion-fab (click)="onAdd()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-fab>\n    <!-- <span>\n      {{ students | async | json}}\n    </span> -->\n  </div>\n  <ion-item>\n    <ion-label>Active students only</ion-label>\n    <ion-checkbox color="dark" [(ngModel)]="activeOnly" (ionChange)="updateFilter()"></ion-checkbox>\n  </ion-item>\n  <ion-list>\n    <ion-item *ngFor="let item of students | async" (click)="onEdit(item)" [class.archived]="item.status === \'archived\'">\n      <ion-avatar item-start>\n        <img src="/assets/images/unknown.png">\n      </ion-avatar>\n      <h2>{{item.name}}</h2>\n      <p> {{item.roomNo}} </p>\n      <p> {{item.email}} </p>\n      <p> {{item.lodgeStatus}} </p>\n      <p> {{item.id}} </p>\n      <p> {{item.email}} </p>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\setting\setting.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* ModalController */]) === "function" && _d || Object])
], SettingPage);

var _a, _b, _c, _d;
//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], ReportPage);

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LodgePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_loading__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__share_data_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_date_fns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lodge_form_lodge_form__ = __webpack_require__(343);
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








var LodgePage = (function () {
    function LodgePage(navCtrl, loadingCtrl, modalCtrl, alertCtrl, afDB, afAuth, dbService, events, _app) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.afDB = afDB;
        this.afAuth = afAuth;
        this.dbService = dbService;
        this.events = events;
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
            var stuRef = _this.db
                .ref()
                .child("/" + _this.userId + "/students/" + stu.studentId);
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
        });
        this.site = this.afDB.object("/" + this.userId + "/site");
        this.wholeList.subscribe(function (d) {
            console.log("whole list", d);
            if (d.length > 0) {
                var unlodgeList = d.filter(function (a) { return a.lodgeStatus === 'unlodged'; });
                _this.events.publish("unlodge:count", unlodgeList.length);
            }
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
        studentRef.once("value", function (snap) {
            console.log(snap.val());
            var students = snap.val();
            var lodgeList = [];
            students.filter(function (s) { return s.status === "active"; }).forEach(function (s) {
                console.log("student:", s, "key:", s.id);
                var _a = _this.checkIfNeedToLodge(s), reason = _a.reason, status = _a.status;
                var lodgeInfo = {
                    studentId: s.id,
                    lodgeStatus: status,
                    reason: reason
                };
                console.log("lodgeInfo:", lodgeInfo);
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
    LodgePage.prototype.onSignIn = function (student, index) {
        console.log("Sign in with :", student);
        // should show sign in form to collect signature
        //  and save it to the database
        var studentRef = "/" + this.userId + "/lodgelists/" + this.dateString;
        var signInForm = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__lodge_form_lodge_form__["a" /* LodgeFormPage */], {
            student: student,
            studentRef: studentRef,
            index: index
        });
        signInForm.present();
    };
    LodgePage.prototype.onText = function (student) {
        console.log("Text with :", student);
        //  Text student
        if (student.phone && student.guardianPhone) {
            // if have more than 1 phone numbers in student record,
            //  show a popup window to choose.
            var alert = this.alertCtrl.create();
            alert.setTitle("Select phone number");
            alert.addInput({
                type: "radio",
                label: student.phone,
                value: student.phone,
                checked: true
            });
            alert.addInput({
                type: "radio",
                label: student.guardianPhone,
                value: student.guardianPhone,
                checked: false
            });
            alert.addButton("Cancel");
            alert.addButton({
                text: "Ok",
                handler: function (data) {
                    console.log("Radio data:", data);
                    // data is the selected phone no.
                    // make a call
                }
            });
            alert.present();
        }
        else {
            var phone = student.phone || student.guardianPhone;
            // make a call
        }
    };
    LodgePage.prototype.onCall = function (student) {
        console.log("Call with :", student);
        //  Call student
        // if have more than 1 phone numbers in student record,
        //  show a popup window to choose.
    };
    LodgePage.prototype.onEmail = function (student) {
        console.log("Email with :", student);
        //  Email student
    };
    return LodgePage;
}());
LodgePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-lodge",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge\lodge.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Lodge</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="onLogout()">\n        Logout\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <h1 center>{{today}}</h1>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="selectedSegment">\n      <ion-segment-button value="unlodged">\n        Sign In\n      </ion-segment-button>\n      <ion-segment-button value="lodged">\n        Already Signed In\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n  <!-- <div>\n    <span>\n        wholeList: {{wholeList | async |json}}\n      </span>\n  </div> -->\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list *ngIf="wholeList">\n    <ion-item-sliding *ngFor="let item of wholeList | async; let i = index " [class.hide]="item.lodgeStatus !== selectedSegment ">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="/assets/images/unknown.png">\n        </ion-avatar>\n        <h2>{{item.name}}</h2>\n        <p> {{item.roomNo}} </p>\n        <p> {{item.email}} </p>\n        <p> {{item.lodgeStatus}} </p>\n        <p> {{item.id}} </p>\n        <p> {{item.email}} </p>\n      </ion-item>\n      <ion-item-options side="left">\n        <button ion-button color="primary" (click)="onText(item)">\n                <ion-icon name="text"></ion-icon>\n                Text\n              </button>\n        <button ion-button color="secondary" (click)="onCall(item)">\n                <ion-icon name="call"></ion-icon>\n                Call\n              </button>\n        <button ion-button color="primary" (click)="onEmail(item)">\n                  <ion-icon name="mail"></ion-icon>\n                  Email \n                </button>\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="onSignIn(item, i)">\n                <ion-icon name="mail"></ion-icon>\n                SignIn\n              </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge\lodge.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__share_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__share_data_service__["a" /* DataService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */]) === "function" && _j || Object])
], LodgePage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=lodge.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LodgeFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_loading__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LodgeFormPage = (function () {
    function LodgeFormPage(navCtrl, viewCtrl, loadingCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.error = false;
        this.errorMessage = "";
        this.student = this.navParams.get("student");
        this.studentRef = this.navParams.get("studentRef");
        this.index = this.navParams.get("index");
        this.db = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database();
    }
    LodgeFormPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad LodgeFormPage");
        this.loader = new __WEBPACK_IMPORTED_MODULE_0__loading_loading__["a" /* LoadingPage */](this.loadingCtrl);
    };
    LodgeFormPage.prototype.onSubmit = function () {
        var _this = this;
        // submit the record
        this.loader.show();
        console.log("submit signin information");
        console.log("index", this.index);
        // should show progress bar
        // also show error/success message to let user know.
        var listRef = this.db.ref(this.studentRef);
        listRef
            .child(this.index.toString())
            .update({ lodgeStatus: "lodged", reason: "signature" })
            .then(function (_) {
            _this.loader.hide();
            _this.viewCtrl.dismiss();
        }, function (err) {
            _this.loader.hide();
            _this.error = true;
            _this.errorMessage = err.message;
        });
        // let stuRef = listRef.orderByChild("studentId").equalTo(this.student.id);
        // let stuRef = listRef.
        // console.log(stuRef);
        // stuRef.ref
        //   .update({ lodgeStatus: "lodged", reason: "signature" })
        //   .then(_ => {
        //     this.viewCtrl.dismiss();
        //   });
        // stuRef.once('value', data => {
        //   console.log(data);
        //   console.log(data.val());
        // });
        // listRef.once("value", data => {
        //   let students = data.val();
        //   students.filter(s => s.studentId = this.student.id)
        // })
    };
    LodgeFormPage.prototype.onCancel = function () {
        console.log("Cancel signin");
        this.viewCtrl.dismiss();
    };
    return LodgeFormPage;
}());
LodgeFormPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-lodge-form",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge-form\lodge-form.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign In</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <h1>This is a signature form</h1>\n    <span>\n      {{student |json}}\n    </span>\n  </div>\n\n  <button ion-button (click)="onSubmit()">\n    Submit\n  </button>\n  <button ion-button (click)="onCancel()">\n      Cancel\n    </button>\n\n  <div *ngIf="error">\n    <h2>{{errorMessage}}</h2>\n  </div>\n\n\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge-form\lodge-form.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
], LodgeFormPage);

//# sourceMappingURL=lodge-form.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(63);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading__ = __webpack_require__(93);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__report_report__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setting_setting__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lodge_lodge__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(25);
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
    function TabsPage(events) {
        var _this = this;
        this.events = events;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__lodge_lodge__["a" /* LodgePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_0__report_report__["a" /* ReportPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__setting_setting__["a" /* SettingPage */];
        this.unlodgeCount = 0;
        events.subscribe("unlodge:count", function (data) {
            _this.unlodgeCount = data;
        });
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\tabs\tabs.html"*/'<ion-tabs selectedIndex="2">\n  <ion-tab [root]="tab1Root" tabTitle="Lodge" tabIcon="home" [tabBadge]="unlodgeCount" tabBadgeStyle="danger"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Report" tabIcon="document"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Setting" tabIcon="settings"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Events */]) === "function" && _a || Object])
], TabsPage);

var _a;
//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(378);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_student_modal_student_modal__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_setting_setting__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_report_report__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_lodge_lodge__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_loading_loading__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__share_data_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_lodge_form_lodge_form__ = __webpack_require__(343);
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
            __WEBPACK_IMPORTED_MODULE_19__pages_lodge_form_lodge_form__["a" /* LodgeFormPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {
                iconMode: "md",
                pageTransition: "md-transition"
            }),
            __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_lodge_lodge__["a" /* LodgePage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_report_report__["a" /* ReportPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_student_modal_student_modal__["a" /* StudentModalPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_loading_loading__["a" /* LoadingPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_lodge_form_lodge_form__["a" /* LodgeFormPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_6__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_18__share_data_service__["a" /* DataService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 438:
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

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Student; });
var Student = (function () {
    function Student() {
        this.id = "";
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

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(355);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], LoadingPage);

//# sourceMappingURL=loading.js.map

/***/ })

},[361]);
//# sourceMappingURL=main.js.map