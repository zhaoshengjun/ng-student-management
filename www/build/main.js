webpackJsonp([0],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getDateString;
/* harmony export (immutable) */ __webpack_exports__["b"] = convertFirebaseObjectToArray;
/* unused harmony export convertFirebaseObject */
/* harmony export (immutable) */ __webpack_exports__["a"] = b64ToBlob;
function getDateString(d) {
    if (d === void 0) { d = new Date(); }
    var day = d.getDate() - 1;
    var month = d.getMonth() + 1;
    var dayStr = day < 10 ? "0" + day.toString() : day.toString();
    var monthStr = month < 10 ? "0" + month.toString() : month.toString();
    return "" + d.getFullYear() + monthStr + dayStr;
}
function convertFirebaseObjectToArray(obj) {
    var arr = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            arr.push(convertFirebaseObject(obj[k], k));
        }
    }
    return arr;
}
function convertFirebaseObject(obj, key) {
    return Object.assign({ key: key }, obj);
}
function b64ToBlob(b64data, contentType, sliceSize) {
    if (contentType === void 0) { contentType = ""; }
    if (sliceSize === void 0) { sliceSize = 512; }
    var byteCharacters = atob(b64data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 189:
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
webpackEmptyAsyncContext.id = 189;

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeriodModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PeriodModalPage = (function () {
    function PeriodModalPage(navCtrl, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.mode = "add";
        this.student = navParams.get("student");
        this.holiday = {
            startDate: Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(new Date(), "YYYY-MM-DD"),
            endDate: Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(new Date(), "YYYY-MM-DD")
        };
        var idx = navParams.get("index");
        if (!isNaN(idx)) {
            // means this is an edit operation
            this.mode = "edit";
            var _a = this.student.holidayPeriods[idx], startDate = _a.startDate, endDate = _a.endDate;
            this.holiday = { startDate: startDate, endDate: endDate };
        }
    }
    PeriodModalPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad PeriodModalPage");
    };
    PeriodModalPage.prototype.onConfirm = function () {
        this.viewCtrl.dismiss(this.holiday);
    };
    PeriodModalPage.prototype.onCancel = function () {
        this.viewCtrl.dismiss();
    };
    return PeriodModalPage;
}());
PeriodModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-period-modal",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\period-modal\period-modal.html"*/'<ion-header>\n	<ion-toolbar>\n		<ion-title>\n			Holiday\n		</ion-title>\n\n		<ion-buttons start>\n			<button ion-button (click)="onCancel()">\n					<ion-icon name="md-close"></ion-icon>\n				</button>\n		</ion-buttons>\n	</ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n\n	<ion-list>\n		<ion-item>\n			<h2 class="title"> {{ student.name}}</h2>\n		</ion-item>\n\n		<ion-item>\n			<ion-label>Start Date</ion-label>\n			<ion-datetime displayFormat="MMM DD YYYY" max="2030-12-31" [(ngModel)]="holiday.startDate"></ion-datetime>\n		</ion-item>\n		<ion-item>\n			<ion-label>End Date</ion-label>\n			<ion-datetime displayFormat="MMM DD YYYY" max="2030-12-31" [(ngModel)]="holiday.endDate"></ion-datetime>\n		</ion-item>\n	</ion-list>\n\n	<div class="equal-box">\n		<button ion-button icon-left class="equal-item" (click)="onConfirm()">\n      <ion-icon name="checkmark-circle"></ion-icon>\n      Save\n    </button>\n		<button ion-button color="secondary" icon-left class="equal-item" (click)="onCancel()">\n      <ion-icon name="close"></ion-icon>\n      Cancel\n    </button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\period-modal\period-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */]])
], PeriodModalPage);

//# sourceMappingURL=period-modal.js.map

/***/ }),

/***/ 233:
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
webpackEmptyAsyncContext.id = 233;

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LodgeDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_date_fns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LodgeDetailPage = (function () {
    function LodgeDetailPage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.hasSignature = true;
        this.student = navParams.get("student");
        if (this.student.reason == "InHoliday") {
            this.hasSignature = false;
        }
        else if (this.student.reason == "signature") {
            this.hasSignature = true;
            this.student.timestampStr = Object(__WEBPACK_IMPORTED_MODULE_0_date_fns__["format"])(this.student.timestamp, "YYYY/MM/DD HH:mm:ss");
        }
    }
    LodgeDetailPage.prototype.ionViewDidLoad = function () {
    };
    LodgeDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return LodgeDetailPage;
}());
LodgeDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-lodge-detail",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge-detail\lodge-detail.html"*/'<ion-header>\n	<ion-toolbar>\n		<ion-title>\n			Lodge Detail\n		</ion-title>\n		<ion-buttons end>\n			<button ion-button (click)="dismiss()">\n						<ion-icon name="md-close"></ion-icon>\n					</button>\n		</ion-buttons>\n	</ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n	<ion-list>\n		<ion-item>\n			<h2 class="title">{{student.name}}</h2>\n		</ion-item>\n		<ion-item>\n			Room No.:\n			<ion-note item-end>\n				{{student.roomNo}}\n			</ion-note>\n		</ion-item>\n		<ion-item *ngIf="!hasSignature">\n			Status:\n			<ion-note item-end>\n				In Holiday\n			</ion-note>\n		</ion-item>\n		<ion-item *ngIf="!hasSignature">\n			Holiday Period:\n			<span item-end class="text_label">\n				{{student.signature}}\n			</span>\n		</ion-item>\n\n		<ion-item *ngIf="hasSignature">\n			Time:\n			<ion-note item-end>\n				{{student.timestampStr}}\n			</ion-note>\n		</ion-item>\n		<div *ngIf="hasSignature" class="pic-box">\n			<ion-label>Signature:</ion-label>\n			<div class="box">\n				<img [src]="student.signature" alt="" class="signature">\n			</div>\n		</div>\n		<div class="box">\n			<button ion-button (click)="dismiss()">Cancel</button>\n		</div>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge-detail\lodge-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */]])
], LodgeDetailPage);

//# sourceMappingURL=lodge-detail.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__period_modal_period_modal__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loading_loading__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_date_fns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__share_data_model__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
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
    function StudentModalPage(viewCtrl, loadCtrl, modalCtrl, alertCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.loadCtrl = loadCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.confirmTitle = "Save";
        this.isArchived = false;
        this.student = new __WEBPACK_IMPORTED_MODULE_3__share_data_model__["a" /* Student */]();
        this.mode = "add";
        this.startDate = "2017-07-01";
        this.endDate = "2017-07-05";
        this.error = false;
        this.errorMessage = "";
    }
    StudentModalPage.prototype.ionViewDidLoad = function () {
        var title = this.navParams.get("confirmTitle");
        if (title)
            this.confirmTitle = title;
        this.db = __WEBPACK_IMPORTED_MODULE_6_firebase__["database"]();
        var uid = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
        this.studentRef = "/" + uid + "/students";
        var student = this.navParams.get("student");
        if (student) {
            this.mode = "edit";
            this.student = student;
            this.startDate = Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(this.student.startDate, "YYYY-MM-DD");
            this.endDate = Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(this.student.endDate, "YYYY-MM-DD");
            console.log("startDate:", this.startDate);
            console.log("endDate:", this.endDate);
            this.index = this.navParams.get("index");
        }
        this.isArchived = this.student.status == "achived";
        this.loader = new __WEBPACK_IMPORTED_MODULE_1__loading_loading__["a" /* LoadingPage */](this.loadCtrl);
    };
    StudentModalPage.prototype.clickedAvatar = function () {
        console.log("needs to change avatar");
        // access the photo lib to change the avatar.
        // this can be saved to the database.
    };
    StudentModalPage.prototype.validateDates = function () {
        // 1. start date >= today
        // 2. end date >= start date
        // 3. holiday start date >= today
        // 4. holiday end date >= holiday start date
        var hasError = false;
        var errors = [];
        var today = new Date();
        this.student.startDate = new Date(this.startDate);
        this.student.endDate = new Date(this.endDate);
        this.student.dateOfBirth = new Date(this.dateOfBirth);
        if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"])(this.student.startDate, today)) {
            hasError = true;
            errors.push({
                type: "warning",
                message: "Start date is before today, but we cannot change historical sign in records"
            });
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"])(this.student.endDate, this.student.startDate)) {
            hasError = true;
            errors.push({
                type: "error",
                message: "End date should no later than start date"
            });
        }
        return { hasError: hasError, errors: errors };
    };
    StudentModalPage.prototype.onConfirm = function () {
        // should update/add the student data
        // delete/archive will be performed in the list view instead of this detail view
        // for unarchived student, there's archive option
        // for archived student, there's unarchive option
        var _this = this;
        var _a = this.validateDates(), hasError = _a.hasError, errors = _a.errors;
        if (!hasError) {
            this.loader.show();
            this.updateStudentStatus();
            var listRef = this.db.ref(this.studentRef);
            if (this.mode == "add") {
                var newKey = listRef.push().key;
                this.student.id = newKey;
                var updateData = {};
                updateData[newKey] = this.student;
                // also need to check if needs to be inserted into today's lodge list.
                listRef.update(updateData).then(function (_) {
                    _this.addIntoLodgeList(_this.student);
                    _this.loader.hide();
                    _this.viewCtrl.dismiss();
                }, function (err) {
                    _this.loader.hide();
                    _this.error = true;
                    _this.errorMessage = err.message;
                    console.log("error when saving student data", err);
                });
            }
            else {
                listRef.child(this.student.id).update(this.student).then(function (_) {
                    _this.loader.hide();
                    _this.viewCtrl.dismiss();
                }, function (err) {
                    _this.loader.hide();
                    _this.error = true;
                    _this.errorMessage = err.message;
                    console.log("error when saving student data", err);
                });
            }
        }
        else {
            var msg = this.buildErrorMessages(errors);
            var confirm_1 = this.alertCtrl.create({
                title: 'Errors',
                subTitle: msg,
                buttons: ['OK']
            });
            confirm_1.present();
        }
    };
    StudentModalPage.prototype.buildErrorMessages = function (errors) {
        var msg = "There are following errors: \n";
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var err = errors_1[_i];
            msg = msg + " - " + err.message + '\n';
        }
        return msg;
    };
    StudentModalPage.prototype.updateStudentStatus = function () {
        var keyDate = new Date();
        if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"])(this.student.endDate, keyDate)) {
            this.student.status = "archived";
        }
        else {
            this.student.status = "active";
        }
    };
    StudentModalPage.prototype.addIntoLodgeList = function (student) {
        // check if current date is between start date and end date.
        var lodgeList = [];
        var _a = this.checkIfNeedToLodge(student), needLodge = _a.needLodge, reason = _a.reason, lodgeStatus = _a.lodgeStatus, signature = _a.signature, timestamp = _a.timestamp;
        if (needLodge) {
            var lodgeInfo = {
                studentId: student.id,
                lodgeStatus: lodgeStatus,
                reason: reason,
                signature: signature,
                timestamp: timestamp
            };
            console.log("lodgeInfo:", lodgeInfo);
            lodgeList.push(lodgeInfo);
        }
        // push to firebase
        var uid = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
        var dateString = Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(new Date(), "YYYYMMDD");
        var lodgeListRefString = "/" + uid + "/lodgelists/" + dateString;
        var listRef = __WEBPACK_IMPORTED_MODULE_6_firebase__["database"]().ref(lodgeListRefString);
        listRef.push(lodgeList);
    };
    StudentModalPage.prototype.checkIfNeedToLodge = function (student) {
        var needLodge = true;
        var reason = "";
        var lodgeStatus = "unlodged";
        var signature = "";
        var timestamp = "";
        var uid = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.uid;
        var keyDate = new Date();
        if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isWithinRange"])(keyDate, student.startDate, student.endDate)) {
            var lodgeInfo = this.checkHolidays(student);
            reason = lodgeInfo.reason;
            lodgeStatus = lodgeInfo.lodgeStatus;
            signature = lodgeInfo.signature;
            timestamp = lodgeInfo.timestamp;
        }
        else if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"])(student.endDate, keyDate)) {
            // update student's status to archived.
            needLodge = false;
            lodgeStatus = "";
            var studentKey = student.id;
            var studentRef = this.db.ref("/" + uid + "/students/" + studentKey);
            studentRef.update({
                status: "archived"
            });
        }
        else if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isBefore"])(keyDate, student.startDate)) {
            needLodge = false;
            lodgeStatus = "";
        }
        return { needLodge: needLodge, reason: reason, lodgeStatus: lodgeStatus, signature: signature, timestamp: timestamp };
    };
    StudentModalPage.prototype.checkHolidays = function (student) {
        var val = {
            reason: "",
            lodgeStatus: "unlodged",
            signature: "",
            timestamp: ""
        };
        var keyDate = new Date();
        var holidays = student.holidayPeriods;
        if (holidays && holidays.length > 0) {
            for (var i = 0; i < holidays.length; i++) {
                var holiday = holidays[i];
                if (Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["isWithinRange"])(keyDate, holiday.startDate, holiday.endDate)) {
                    val.reason = "InHoliday";
                    val.lodgeStatus = "lodged";
                    val.signature = Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(holiday.startDate, "YYYY-MM-DD") + " ~ " + Object(__WEBPACK_IMPORTED_MODULE_2_date_fns__["format"])(holiday.endDate, "YYYY-MM-DD");
                    val.timestamp = new Date().toISOString();
                    break;
                }
            }
        }
        return val;
    };
    StudentModalPage.prototype.onCancel = function () {
        this.viewCtrl.dismiss();
    };
    StudentModalPage.prototype.onAddHoliday = function () {
        var _this = this;
        console.log("Add holiday");
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__period_modal_period_modal__["a" /* PeriodModalPage */], {
            student: this.student
        });
        modal.onDidDismiss(function (data) {
            if (data) {
                var startDate = data.startDate, endDate = data.endDate;
                if (!_this.student.holidayPeriods) {
                    _this.student.holidayPeriods = [];
                }
                _this.student.holidayPeriods.push({ startDate: startDate, endDate: endDate });
            }
        });
        modal.present();
    };
    StudentModalPage.prototype.onEditHoliday = function (index) {
        console.log("Edit holiday");
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__period_modal_period_modal__["a" /* PeriodModalPage */], {
            student: this.student,
            index: index
        });
        modal.present();
    };
    StudentModalPage.prototype.onDeleteHoliday = function (index) {
        var _this = this;
        console.log("Delete holiday");
        var confirm = this.alertCtrl.create({
            title: "Confirm",
            message: "Are you sure to delete this holiday period?",
            buttons: [
                {
                    text: "Cancel",
                    handler: function () {
                        console.log("Cancel clicked");
                    }
                },
                {
                    text: "Confirm",
                    handler: function () {
                        _this.student.holidayPeriods.splice(index, 1);
                    }
                }
            ]
        });
        confirm.present();
    };
    return StudentModalPage;
}());
StudentModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["n" /* Component */])({
        selector: "page-student-modal",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\student-modal\student-modal.html"*/'<ion-header>\n	<ion-toolbar>\n		<ion-title>\n			Student Info\n		</ion-title>\n\n		<ion-buttons start>\n			<button ion-button (click)="onCancel()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n		</ion-buttons>\n	</ion-toolbar>\n</ion-header>\n\n<ion-content padding [class.dark]="isArchived">\n	<ion-list>\n		<ion-item>\n			<ion-avatar (click)="clickedAvatar()" item-start>\n				<img src="/assets/images/unknown.png">\n				<button ion-button class="inside-middle">Change</button>\n			</ion-avatar>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Full Name\n			</ion-label>\n			<ion-input type="text" [(ngModel)]="student.name" placeholder="Full Name"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Id\n			</ion-label>\n			<ion-input type="text" [(ngModel)]="student.studentId" placeholder="Student Id"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				University\n			</ion-label>\n			<ion-select [(ngModel)]="student.university">\n				<ion-option>\n					QUT\n				</ion-option>\n				<ion-option>\n					UQ\n				</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Email\n			</ion-label>\n			<ion-input type="email" [(ngModel)]="student.email" placeholder=""></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Phone\n			</ion-label>\n			<ion-input type="tel" [(ngModel)]="student.phone" placeholder=""></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Start Date\n			</ion-label>\n			<ion-input type="date" [(ngModel)]="startDate" placeholder=""></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				End Date\n			</ion-label>\n			<ion-input type="date" [(ngModel)]="endDate" placeholder=""></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Room No.\n			</ion-label>\n			<ion-input type="number" [(ngModel)]="student.roomNo" placeholder=""></ion-input>\n		</ion-item>\n\n		<ion-list-header><span class="list_header">Guardian Info</span></ion-list-header>\n		<ion-item>\n			<ion-label>\n				Guardian Name\n			</ion-label>\n			<ion-input type="text" [(ngModel)]="student.guardianName" placeholder="Full Name"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Guardian Email\n			</ion-label>\n			<ion-input type="email" [(ngModel)]="student.guardianEmail" placeholder=""></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Guardian Phone\n			</ion-label>\n			<ion-input type="tel" [(ngModel)]="student.guardianPhone" placeholder=""></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Comments\n			</ion-label>\n			<ion-textarea rows="4" [(ngModel)]="student.comments" placeholder="Any comments?"></ion-textarea>\n		</ion-item>\n\n		<ion-list-header> <span class="list_header"> Holiday Info</span></ion-list-header>\n		<ion-item>\n			<ion-row>\n				<ion-col col-3 push-8>\n					<button ion-button icon-left (click)="onAddHoliday()" pull-right>\n							<ion-icon name="plane"></ion-icon>\n							Add\n						</button>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col class="table header">Start Date</ion-col>\n				<ion-col class="table header">End Date</ion-col>\n				<ion-col class="table header">Actions</ion-col>\n			</ion-row>\n\n			<div *ngIf="student.holidayPeriods">\n				<ion-row *ngFor="let holiday of student.holidayPeriods, let i = index">\n					<ion-col class="table">{{holiday.startDate}}</ion-col>\n					<ion-col class="table">{{holiday.endDate}}</ion-col>\n					<ion-col class="equal-box table">\n						<button class="equal-item" (click)="onEditHoliday(i)" ion-button small>\n              <ion-icon name=\'create\' class="icon-btn"></ion-icon>\n            </button>\n						<button class="equal-item" (click)="onDeleteHoliday(i)" ion-button small>\n                <ion-icon name=\'trash\' class="icon-btn"></ion-icon>\n            </button>\n					</ion-col>\n				</ion-row>\n			</div>\n		</ion-item>\n\n	</ion-list>\n	<hr>\n	<div class="equal-box">\n		<button ion-button color="positive" icon-left class="equal-item" (click)="onConfirm()">\n		<ion-icon name="checkmark-circle"></ion-icon>\n		{{ confirmTitle }}\n	</button>\n		<button ion-button color="assertive" icon-left class="equal-item" (click)="onCancel()">\n		<ion-icon name="close"></ion-icon>\n		Cancel\n	</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\student-modal\student-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavParams */]])
], StudentModalPage);

//# sourceMappingURL=student-modal.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__student_modal_student_modal__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__(174);
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
            console.log("options:", opts);
            _this.queryOpts = opts;
            _this.students = _this.afDB.list(studentsRefString, _this.queryOpts);
        });
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        // load all students info
    };
    SettingPage.prototype.updateFilter = function () {
        console.log("activeOnly: ", this.activeOnly);
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
    SettingPage.prototype.onEdit = function (student, index) {
        console.log("Edit student info: ", student, index);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__student_modal_student_modal__["a" /* StudentModalPage */], {
            confirmTitle: "Update",
            student: student,
            index: index
        });
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
        selector: "page-setting",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\setting\setting.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			Setting\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div>\n		<ion-fab right bottom>\n			<button ion-fab (click)="onAdd()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n		</ion-fab>\n	</div>\n	<ion-item>\n		<ion-label>Active students only</ion-label>\n		<ion-checkbox color="dark" [(ngModel)]="activeOnly" (ionChange)="updateFilter()"></ion-checkbox>\n	</ion-item>\n	<ion-list>\n		<ion-item *ngFor="let item of students | async;let i = index" (click)="onEdit(item, i)" [class.archived]="item.status === \'archived\'">\n			<ion-avatar item-start>\n				<ion-img src="/assets/images/unknown.png"></ion-img>\n			</ion-avatar>\n			<h2>{{item.name}}</h2>\n			<p>Room Number: {{item.roomNo}} </p>\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\setting\setting.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* ModalController */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_email_composer__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__share_common__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_date_fns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__share_excel_service__ = __webpack_require__(808);
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
    function ReportPage(navCtrl, excel, email, file, alertCtrl) {
        this.navCtrl = navCtrl;
        this.excel = excel;
        this.email = email;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.searchTerm = "byDate";
        this.loaded = false;
        this.fs = cordova.file.documentsDirectory; // iOS specific
    }
    ReportPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.uid = __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid;
        this.lodgeListsRefString = "/" + this.uid + "/lodgelists";
        this.studentsRefString = "/" + this.uid + "/students";
        this.getData().then(function (val) {
            _this.convertFirebaseData(val);
        });
        this.searchUniversity = "UQ";
        this.searchDate = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date("2017-08-10"), 'YYYY-MM-DD');
    };
    ReportPage.prototype.convertFirebaseData = function (snapshot) {
        this.lodgeLists = snapshot[0].val();
        this.students = Object(__WEBPACK_IMPORTED_MODULE_6__share_common__["b" /* convertFirebaseObjectToArray */])(snapshot[1].val());
        this.loaded = true;
    };
    ReportPage.prototype.onChange = function (event) {
        this.resultData = [];
    };
    ReportPage.prototype.onSearch = function () {
        var _this = this;
        this.resultData = [];
        // check if the date is after today.
        if (this.searchTerm !== "byPerson" && Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["isBefore"])(new Date(), this.searchDate)) {
            var confirm = this.alertCtrl.create({
                title: 'Error',
                subTitle: "Cannot search data later than today.",
                buttons: ['OK']
            });
            confirm.present();
        }
        else {
            if (!this.loaded) {
                this.getData().then(function (snap) {
                    _this.convertFirebaseData(snap);
                    _this.doSearch();
                });
            }
            else {
                this.doSearch();
                this.formatResultData();
                console.log("resultData:", this.resultData);
            }
        }
    };
    ReportPage.prototype.formatResultData = function () {
        var arr = this.resultData;
        if (arr && arr.length > 0) {
            this.resultData = arr.map(function (s) {
                var date = s.date, timestamp = s.timestamp, startDate = s.startDate, endDate = s.endDate, dateOfBirth = s.dateOfBirth;
                date && (date = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(date), 'YYYY/MM/DD'));
                startDate && (startDate = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(startDate), 'YYYY/MM/DD'));
                endDate && (endDate = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(endDate), 'YYYY/MM/DD'));
                dateOfBirth && (dateOfBirth = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(dateOfBirth), 'YYYY/MM/DD'));
                timestamp && (timestamp = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(timestamp), 'HH:MM:SS'));
                return Object.assign(s, { date: date, timestamp: timestamp, startDate: startDate, endDate: endDate, dateOfBirth: dateOfBirth });
            });
        }
    };
    ReportPage.prototype.doSearch = function () {
        switch (this.searchTerm) {
            case "byDate":
                this.searchByDate();
                break;
            case "byPerson":
                this.searchByPerson();
                break;
            case "byUniversity":
                this.searchByUniversity();
                break;
        }
    };
    ReportPage.prototype.searchByDate = function () {
        var _this = this;
        var findStudentInfo = function (sid) {
            return _this.students.filter(function (s) { return s.id === sid; })[0];
        };
        var keyDate = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(this.searchDate), "YYYYMMDD");
        var lodgelist = this.lodgeLists[keyDate];
        if (lodgelist) {
            this.noData = false;
            this.resultData = lodgelist
                .map(function (l) {
                var studentInfo = findStudentInfo(l.studentId);
                return _this.mergeInfo(studentInfo, l, _this.searchDate);
            })
                .filter(function (e) { return e; });
        }
        else {
            this.noData = true;
        }
    };
    ReportPage.prototype.mergeInfo = function (student, lodgeInfo, date) {
        var lodgeStatus = lodgeInfo.lodgeStatus, reason = lodgeInfo.reason, signature = lodgeInfo.signature, timestamp = lodgeInfo.timestamp, reminderTime = lodgeInfo.reminderTime;
        return Object.assign(student, {
            date: date,
            lodgeStatus: lodgeStatus,
            reason: reason,
            signature: signature,
            timestamp: timestamp,
            reminderTime: reminderTime
        });
    };
    ReportPage.prototype.searchByPerson = function () {
        var _this = this;
        var flatten = function (arr) {
            var result = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var outer = arr_1[_i];
                for (var _a = 0, outer_1 = outer; _a < outer_1.length; _a++) {
                    var inner = outer_1[_a];
                    if (inner) {
                        result.push(inner);
                    }
                }
            }
            return result;
        };
        var name = this.searchPerson.trim();
        var result = this.students.filter(function (s) { return s.name.includes(name); }).map(function (s) {
            var lodgeInfos = [];
            for (var keydate in _this.lodgeLists) {
                var list = _this.lodgeLists[keydate];
                var date = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(keydate, 'YYYY-MM-DD');
                var result_1 = list.filter(function (l) { return l.studentId == s.id; })[0];
                if (result_1) {
                    lodgeInfos.push(_this.mergeInfo(s, result_1, date));
                }
            }
            return lodgeInfos;
        });
        this.resultData = flatten(result);
    };
    ReportPage.prototype.searchByUniversity = function () {
        var _this = this;
        var findLodgeInfoByStudentId = function (sid, keydate) {
            var date = Object(__WEBPACK_IMPORTED_MODULE_7_date_fns__["format"])(new Date(keydate), "YYYYMMDD");
            var lodgelist = _this.lodgeLists[date];
            return lodgelist.filter(function (s) { return s.studentId === sid; })[0];
        };
        var university = this.searchUniversity.trim();
        this.resultData = this.students
            .filter(function (s) { return s.university == university; })
            .map(function (s) {
            var lodgeInfo = findLodgeInfoByStudentId(s.id, _this.searchDate);
            if (lodgeInfo) {
                return _this.mergeInfo(s, lodgeInfo, _this.searchDate);
            }
        })
            .filter(function (e) { return e; });
    };
    ReportPage.prototype.getData = function () {
        var lodgeListsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref(this.lodgeListsRefString);
        var studentsRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref(this.studentsRefString);
        var lodgeStream = __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default.a.Observable.from(lodgeListsRef.once("value"));
        var studentsStream = __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default.a.Observable.from(studentsRef.once("value"));
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default.a.Observable.forkJoin(lodgeStream, studentsStream).toPromise();
    };
    ReportPage.prototype.onExport = function () {
        var _this = this;
        console.log("export report");
        this.excel.createXSLX([['Head1', 'Head2', 'Head3'], ['val1', 'val2', 'val3']])
            .then(function (data) {
            console.log("excel data:", data);
            var time = new Date().getTime();
            var fileName = "UniLodge-" + time + ".xlsx";
            _this.file.writeFile(_this.fs, fileName, data, { replace: true })
                .then(function (f) {
                console.log("Returned from writing file: ", f);
                var fp = _this.fs + fileName;
                // let emailAddress = firebase.auth().currentUser.email;
                var emailAddress = "zhao.shengjun@gmail.com";
                var emailOptions = {
                    to: emailAddress,
                    attachments: [fp],
                    subject: "UniLodge Report",
                    body: "Here's the report you wanted."
                };
                _this.email.open(emailOptions)
                    .then(function () {
                    console.log('done!');
                })
                    .catch(function (err) {
                    console.log('error: ', err.message);
                });
            })
                .catch(function (err) {
                console.log("Error when writing file: ", err);
            });
        })
            .catch(function (err) {
            console.log("error:", err.message);
        });
    };
    return ReportPage;
}());
ReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: "page-report",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\report\report.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			Report\n		</ion-title>\n		<ion-buttons end>\n			<button (click)="onExport()">\n				<ion-icon name="md-print" class="big_icon"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n	<ion-toolbar>\n		<ion-segment [(ngModel)]="searchTerm" (ionChange)="onChange($event)">\n			<ion-segment-button value="byDate">\n				By Date\n			</ion-segment-button>\n			<ion-segment-button value="byPerson">\n				By Person\n			</ion-segment-button>\n			<ion-segment-button value="byUniversity">\n				By University\n			</ion-segment-button>\n		</ion-segment>\n	</ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n	<div [ngSwitch]="searchTerm">\n		<div *ngSwitchCase="\'byDate\'">\n			<ion-list>\n				<ion-item>\n					<ion-label>Date</ion-label>\n					<ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="searchDate"></ion-datetime>\n				</ion-item>\n			</ion-list>\n		</div>\n\n		<div *ngSwitchCase="\'byPerson\'">\n			<ion-list>\n				<ion-item>\n					<ion-label>Student</ion-label>\n					<ion-input [(ngModel)]="searchPerson"></ion-input>\n				</ion-item>\n			</ion-list>\n		</div>\n\n		<div *ngSwitchCase="\'byUniversity\'">\n			<ion-list>\n				<ion-item>\n					<ion-label>\n						University\n					</ion-label>\n					<ion-select [(ngModel)]="searchUniversity">\n						<ion-option>\n							QUT\n						</ion-option>\n						<ion-option>\n							UQ\n						</ion-option>\n					</ion-select>\n				</ion-item>\n				<ion-item>\n					<ion-label>Date</ion-label>\n					<ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="searchDate"></ion-datetime>\n				</ion-item>\n			</ion-list>\n		</div>\n	</div>\n	<button ion-button block medium (click)="onSearch($event)" item-end>\n						<ion-icon name="search"></ion-icon>\n						<span class="search_text">Search</span>\n					</button>\n\n	<div *ngIf="noData">\n		<p class="center">No data matches the selected criterias.</p>\n	</div>\n	<ion-list *ngIf="resultData">\n		<ion-item *ngFor="let item of resultData" [class.highlight]="item.lodgeStatus === \'unlodged\'">\n			<ion-row>\n				<span class="left">Date:</span>\n				<span class="right">{{item.date}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">University:</span>\n				<span class="right">{{item.university}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Student ID:</span>\n				<span class="right">{{item.id}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Name:</span>\n				<span class="right">{{item.name}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">DOB:</span>\n				<span class="right">{{item.dateOfBirth}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Room Number:</span>\n				<span class="right">{{item.roomNo}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Time Signed In:</span>\n				<span class="right">{{item.timestamp}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Singnature:</span>\n				<span class="right"><a [href]="item.signature" *ngIf="item.signature">link</a></span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Lease Start:</span>\n				<span class="right">{{item.startDate}}</span>\n			</ion-row>\n			<ion-row>\n				<span class="left">Lease End:</span>\n				<span class="right">{{item.endDate}}</span>\n			</ion-row>\n		</ion-item>\n	</ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\report\report.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__share_excel_service__["a" /* ExcelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__share_excel_service__["a" /* ExcelService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object])
], ReportPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=report.js.map

/***/ }),

/***/ 357:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LodgePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast_zttoast__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lodge_detail_lodge_detail__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__share_data_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__share_common__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_date_fns__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lodge_form_lodge_form__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_email_composer__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_sms__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var LodgePage = (function () {
    function LodgePage(navCtrl, loadingCtrl, modalCtrl, alertCtrl, afDB, afAuth, dbService, events, email, sms, call, _app) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.afDB = afDB;
        this.afAuth = afAuth;
        this.dbService = dbService;
        this.events = events;
        this.email = email;
        this.sms = sms;
        this.call = call;
        this._app = _app;
        this.selectedSegment = "unlodged";
        this.db = this.afDB.database;
        this.toast = new __WEBPACK_IMPORTED_MODULE_0__toast_zttoast__["a" /* ZTToast */]();
    }
    LodgePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = new __WEBPACK_IMPORTED_MODULE_5__loading_loading__["a" /* LoadingPage */](this.loadingCtrl);
        this.selectedDate = new Date();
        this.dateString = Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["format"])(this.selectedDate, "YYYYMMDD");
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
                            reason: stu.reason,
                            signature: stu.signature,
                            timestamp: stu.timestamp
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
            if (d) {
                if (d.length > 0) {
                    var unlodgeList = d.filter(function (a) { return a.lodgeStatus === "unlodged"; });
                    _this.events.publish("unlodge:count", unlodgeList.length);
                }
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
            var stuSnap = snap.val();
            var students = Object(__WEBPACK_IMPORTED_MODULE_9__share_common__["b" /* convertFirebaseObjectToArray */])(stuSnap);
            console.log("students:", students);
            var lodgeList = [];
            if (students) {
                if (students.length > 0) {
                    students.filter(function (s) { return s.status === "active"; }).forEach(function (s) {
                        console.log("student:", s, "key:", s.id);
                        var _a = _this.checkIfNeedToLodge(s), needLodge = _a.needLodge, reason = _a.reason, lodgeStatus = _a.lodgeStatus, signature = _a.signature, timestamp = _a.timestamp;
                        if (needLodge) {
                            var lodgeInfo = {
                                studentId: s.id,
                                lodgeStatus: lodgeStatus,
                                reason: reason,
                                signature: signature,
                                timestamp: timestamp
                            };
                            console.log("lodgeInfo:", lodgeInfo);
                            lodgeList.push(lodgeInfo);
                        }
                    });
                    listRef.update(lodgeList);
                }
            }
        });
    };
    LodgePage.prototype.checkIfNeedToLodge = function (student) {
        var needLodge = true;
        var reason = "";
        var lodgeStatus = "unlodged";
        var signature = "";
        var timestamp = "";
        if (Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["isWithinRange"])(this.selectedDate, student.startDate, student.endDate)) {
            var lodgeInfo = this.checkHolidays(student);
            reason = lodgeInfo.reason;
            lodgeStatus = lodgeInfo.lodgeStatus;
            signature = lodgeInfo.signature;
            timestamp = lodgeInfo.timestamp;
        }
        else if (Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["isBefore"])(student.endDate, this.selectedDate)) {
            // update student's status to archived.
            needLodge = false;
            lodgeStatus = "";
            var studentKey = student.id;
            var studentRef = this.db.ref("/" + this.userId + "/students/" + studentKey);
            studentRef.update({
                status: "archived"
            });
        }
        else if (Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["isBefore"])(this.selectedDate, student.startDate)) {
            needLodge = false;
            lodgeStatus = "";
        }
        return { needLodge: needLodge, reason: reason, lodgeStatus: lodgeStatus, signature: signature, timestamp: timestamp };
    };
    LodgePage.prototype.checkHolidays = function (student) {
        var val = {
            reason: "",
            lodgeStatus: "unlodged",
            signature: "",
            timestamp: ""
        };
        var holidays = student.holidayPeriods;
        if (holidays && holidays.length > 0) {
            for (var i = 0; i < holidays.length; i++) {
                var holiday = holidays[i];
                if (Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["isWithinRange"])(this.selectedDate, holiday.startDate, holiday.endDate)) {
                    val.reason = "InHoliday";
                    val.lodgeStatus = "lodged";
                    val.signature = Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["format"])(holiday.startDate, "YYYY-MM-DD") + " ~ " + Object(__WEBPACK_IMPORTED_MODULE_10_date_fns__["format"])(holiday.endDate, "YYYY-MM-DD");
                    val.timestamp = new Date().toISOString();
                    break;
                }
            }
        }
        return val;
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
        var signInForm = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__lodge_form_lodge_form__["a" /* LodgeFormPage */], {
            student: student,
            studentRef: studentRef,
            index: index
        });
        signInForm.present();
    };
    LodgePage.prototype.onText = function (student, index) {
        var _this = this;
        console.log("Text with :", student);
        //  Text student
        var textStudent = function (phoneNumber) {
            _this.sms
                .send(phoneNumber, "This is a reminder from UniLodge.")
                .then(function (_) {
                _this.updateReminderInfo(index, "text");
            })
                .catch(function (err) {
                _this.toast.error("Error when sending text. Please check your security settings.");
            });
        };
        this.choosePhoneNumber(student, textStudent);
    };
    LodgePage.prototype.choosePhoneNumber = function (student, cb) {
        if (student.phone && student.guardianPhone) {
            // if have more than 1 phone numbers in student record,
            //  show a popup window to choose.
            var alert_1 = this.alertCtrl.create();
            alert_1.setTitle("Select phone number");
            alert_1.addInput({
                type: "radio",
                label: student.phone,
                value: student.phone,
                checked: true
            });
            alert_1.addInput({
                type: "radio",
                label: student.guardianPhone,
                value: student.guardianPhone,
                checked: false
            });
            alert_1.addButton("Cancel");
            alert_1.addButton({
                text: "Ok",
                handler: function (phoneNumber) {
                    console.log("Radio data:", phoneNumber);
                    cb(phoneNumber);
                }
            });
            alert_1.present();
        }
        else {
            var phoneNumber = student.phone || student.guardianPhone;
            cb(phoneNumber);
        }
    };
    LodgePage.prototype.onCall = function (student, index) {
        var _this = this;
        console.log("Call with :", student);
        //  Call student
        // if have more than 1 phone numbers in student record,
        //  show a popup window to choose.
        var callStudent = function (phoneNumber) {
            _this.call
                .callNumber(phoneNumber, true)
                .then(function () {
                _this.updateReminderInfo(index, "call");
            })
                .catch(function (err) {
                _this.toast.error("Error when making a call. Please check your security settings.");
            });
        };
        this.choosePhoneNumber(student, callStudent);
    };
    LodgePage.prototype.onEmail = function (student, index) {
        var _this = this;
        //  Email student
        this.email.isAvailable().then(function (available) {
            if (available) {
                _this.email
                    .open({
                    app: "mailto",
                    to: student.email,
                    subject: "Reminder",
                    body: "This is a reminder from UniLodge."
                })
                    .then(function () {
                    _this.toast.success("Email sent successfully!", 500);
                    _this.updateReminderInfo(index, "email");
                })
                    .catch(function (err) {
                    _this.toast.error("Error when sending email. Please check your security settings.");
                });
            }
        });
    };
    LodgePage.prototype.onShowDetail = function (student) {
        if (student.lodgeStatus == "lodged") {
            // show lodged detail information
            var lodgeDetail = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__lodge_detail_lodge_detail__["a" /* LodgeDetailPage */], { student: student });
            lodgeDetail.present();
        }
    };
    LodgePage.prototype.updateReminderInfo = function (index, remindMethod, reminderTime) {
        if (remindMethod === void 0) { remindMethod = "text"; }
        if (reminderTime === void 0) { reminderTime = new Date(); }
        var studentRefString = "/" + this.userId + "/lodgelists/" + this.dateString;
        var studentRef = this.db.ref(studentRefString);
        studentRef.child(index).update({
            remindMethod: remindMethod,
            reminderTime: reminderTime
        });
    };
    return LodgePage;
}());
LodgePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: "page-lodge",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge\lodge.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>Lodge</ion-title>\n		<ion-buttons end>\n			<button (click)="onLogout()">\n        <ion-icon name="log-out" class="big_icon"></ion-icon>\n      </button>\n		</ion-buttons>\n	</ion-navbar>\n\n	<h1 center>{{todayStr}}</h1>\n	<ion-toolbar>\n		<ion-segment [(ngModel)]="selectedSegment">\n			<ion-segment-button value="unlodged">\n				Sign In\n			</ion-segment-button>\n			<ion-segment-button value="lodged">\n				Already Signed In\n			</ion-segment-button>\n		</ion-segment>\n	</ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n	<div *ngIf="wholeList">\n		<ion-card *ngFor="let item of wholeList | async; let i = index" [class.hide]="item.lodgeStatus !== selectedSegment">\n			<ion-row>\n				<ion-col col-8 class="padding_left">\n					<h2 class="card_title">\n						{{item.name}}\n					</h2>\n					<p>Room Number: {{item.roomNo}}</p>\n				</ion-col>\n				<ion-col col-4 *ngIf="item.lodgeStatus ==\'unlodged\'" class="padding_right">\n					<button ion-button outline (click)="onSignIn(item, i)" color="secondary" class="right_button">\n							<ion-icon name="md-checkbox-outline"></ion-icon>\n					<span class="button_text"> Sign In</span>\n				</button>\n				</ion-col>\n				<ion-col col-4 *ngIf="item.lodgeStatus ==\'lodged\'">\n					<button ion-button outline (click)="onShowDetail(item)" class="right_button">\n							<ion-icon name="md-clipboard"></ion-icon>\n							<span class="button_text">Detail</span>\n				</button>\n				</ion-col>\n			</ion-row>\n\n			<ion-row *ngIf="item.lodgeStatus ==\'unlodged\'">\n				<ion-col>\n					<button ion-button small clear class="color_button" (click)="onCall(item)">\n							<ion-icon name="call"></ion-icon>\n							<span class="button_text">Call</span>\n				</button>\n				</ion-col>\n				<ion-col>\n					<button ion-button small clear class="color_button" (click)="onText(item)">\n							<ion-icon name="text"></ion-icon>\n							<span class="button_text">Text</span>\n						</button>\n				</ion-col>\n				<ion-col>\n					<button ion-button small clear class="color_button" (click)="onEmail(item)">\n							<ion-icon name="mail"></ion-icon>\n							<span class="button_text">Email</span>\n						</button>\n				</ion-col>\n			</ion-row>\n		</ion-card>\n\n	</div>\n\n	<!-- <ion-list *ngIf="wholeList">\n		<ion-item-sliding *ngFor="let item of wholeList | async; let i = index" [class.hide]="item.lodgeStatus !== selectedSegment "\n		  #slidingItem (click)="onShowDetail(item)">\n\n			<ion-item [class.lodged]="item.lodgeStatus === \'lodged\'" class="box">\n				<ion-avatar item-start>\n					<img src="/assets/images/unknown.png">\n				</ion-avatar>\n				<h2>{{item.name}}</h2>\n				<p> {{item.roomNo}} </p>\n			</ion-item>\n			<ion-item-options side="left" [class.hide]="item.lodgeStatus === \'lodged\' ">\n				<button ion-button color="primary" (click)="onText(item, slidingItem)">\n									<ion-icon name="text"></ion-icon>\n									Text\n								</button>\n				<button ion-button color="secondary" (click)="onCall(item, slidingItem)">\n									<ion-icon name="call"></ion-icon>\n									Call\n								</button>\n				<button ion-button color="primary" (click)="onEmail(item, slidingItem)">\n										<ion-icon name="mail"></ion-icon>\n										Email\n									</button>\n			</ion-item-options>\n			<ion-item-options side="right" [class.hide]="item.lodgeStatus === \'lodged\' ">\n				<button ion-button color="primary" (click)="onSignIn(item, slidingItem, i)">\n									<ion-icon name="mail"></ion-icon>\n									SignIn\n								</button>\n			</ion-item-options>\n		</ion-item-sliding>\n	</ion-list> -->\n\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge\lodge.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_8__share_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_email_composer__["a" /* EmailComposer */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_native_sms__["a" /* SMS */],
        __WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
], LodgePage);

//# sourceMappingURL=lodge.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZTToast; });
var ZTToast = (function () {
    function ZTToast() {
        this.defaultDuration = 500;
        if (!ZTToast._sharedInstance) {
            ZTToast._sharedInstance = this;
        }
        return ZTToast._sharedInstance;
    }
    ZTToast.prototype.warning = function (msg, duration) {
        if (duration === void 0) { duration = this.defaultDuration; }
        var options = {
            style: {
                main: {
                    background: "#F89406",
                    color: "white"
                }
            },
            settings: {
                duration: duration
            }
        };
        iqwerty.toast.Toast(msg, options);
    };
    ZTToast.prototype.error = function (msg, duration) {
        if (duration === void 0) { duration = this.defaultDuration; }
        var options = {
            style: {
                main: {
                    background: "#BD362F",
                    color: "white"
                }
            },
            settings: {
                duration: duration
            }
        };
        iqwerty.toast.Toast(msg, options);
    };
    ZTToast.prototype.info = function (msg, duration) {
        if (duration === void 0) { duration = this.defaultDuration; }
        var options = {
            style: {
                main: {
                    background: "#333",
                    color: "white"
                }
            },
            settings: {
                duration: duration
            }
        };
        iqwerty.toast.Toast(msg, options);
    };
    ZTToast.prototype.success = function (msg, duration) {
        if (duration === void 0) { duration = this.defaultDuration; }
        var options = {
            style: {
                main: {
                    background: "#51A351",
                    color: "white"
                }
            },
            settings: {
                duration: duration
            }
        };
        iqwerty.toast.Toast(msg, options);
    };
    return ZTToast;
}());

//# sourceMappingURL=zttoast.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(106);
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
            var today = Object(__WEBPACK_IMPORTED_MODULE_3__common__["c" /* getDateString */])();
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

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LodgeFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_loading__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toast_zttoast__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__share_common__ = __webpack_require__(106);
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
        this.uid = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid;
        this._toast = new __WEBPACK_IMPORTED_MODULE_4__toast_zttoast__["a" /* ZTToast */]();
    }
    LodgeFormPage.prototype.resizeCanvas = function () {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.canvas.offsetHeight * ratio;
        this.canvas.getContext("2d").scale(ratio, ratio);
    };
    LodgeFormPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad LodgeFormPage");
        this.loader = new __WEBPACK_IMPORTED_MODULE_0__loading_loading__["a" /* LoadingPage */](this.loadingCtrl);
        this.canvas = document.getElementById("canvas");
        this.pad = new SignaturePad(this.canvas);
        window.onresize = this.resizeCanvas;
        this.resizeCanvas();
    };
    LodgeFormPage.prototype.onSubmit = function () {
        console.log("submit signin information");
        console.log("index", this.index);
        this.savePic();
    };
    LodgeFormPage.prototype.onCancel = function () {
        console.log("Cancel signin");
        this.viewCtrl.dismiss();
    };
    LodgeFormPage.prototype.savePic = function () {
        var _this = this;
        var pic = this.pad.toDataURL();
        var _a = pic.split(","), contentType = _a[0], b64Data = _a[1];
        var picData = Object(__WEBPACK_IMPORTED_MODULE_5__share_common__["a" /* b64ToBlob */])(b64Data, contentType);
        if (this.uid) {
            this._toast.info("Start save record information...");
            var ref = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref("/" + this.uid);
            var generatedPicName = this.generatePictureName();
            var meta = {
                contentType: "image/jpeg",
                customMetadata: {
                    activity: "lodge"
                }
            };
            var showUploadError_1 = function (err) {
                _this._toast.error(err.message);
            };
            ref.child(generatedPicName).put(picData, meta).then(function (snapshot) {
                console.log("snapshot:", snapshot);
                _this.url = snapshot.downloadURL;
                _this.updateLodgeStatus();
            }, function (err) {
                showUploadError_1(err);
            });
        }
    };
    LodgeFormPage.prototype.updateLodgeStatus = function () {
        var _this = this;
        var listRef = this.db.ref(this.studentRef);
        listRef
            .child(this.index.toString())
            .update({
            lodgeStatus: "lodged",
            reason: "signature",
            timestamp: new Date().toISOString(),
            signature: this.url
        })
            .then(function (_) {
            _this._toast.success("Saved successfully!");
            _this.viewCtrl.dismiss();
        }, function (err) {
            _this._toast.error(err.message);
        });
    };
    LodgeFormPage.prototype.generatePictureName = function () {
        var d = new Date().valueOf();
        return this.uid + d + ".jpg";
    };
    return LodgeFormPage;
}());
LodgeFormPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: "page-lodge-form",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge-form\lodge-form.html"*/'<ion-header>\n\n	<ion-navbar>\n		<ion-title>Sign In</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<ion-list>\n		<ion-row>\n			<h2> {{ student?.name}}</h2>\n		</ion-row>\n		<ion-row>\n			<p> Room No.: {{student?.roomNo}} </p>\n		</ion-row>\n		<ion-row class=\'canvas-container\'>\n			<canvas id="canvas"></canvas>\n		</ion-row>\n	</ion-list>\n	<ion-row>\n		<ion-col width-50>\n			<button ion-button (click)="onSubmit()" block large>\n        Submit\n      </button>\n		</ion-col>\n		<ion-col>\n			<button ion-button (click)="onCancel()" block large>\n          Cancel\n        </button>\n		</ion-col>\n	</ion-row>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\lodge-form\lodge-form.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
], LodgeFormPage);

//# sourceMappingURL=lodge-form.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
        selector: "page-signup",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\signup\signup.html"*/'<ion-header>\n\n	<ion-navbar>\n		<ion-title>Signup</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n\n<!-- <ion-content padding>\n  <ion-list inset>\n    <ion-item>\n      <ion-label>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="user.email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="user.password"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button ion-button (click)="onSubmit(user)">Submit</button>\n  <button ion-button (click)="onCancel()">Cancel</button>\n</ion-content> -->\n\n<ion-content padding>\n	<ion-list>\n		<ion-item>\n			<ion-label>\n				Email\n			</ion-label>\n			<ion-input type="email" placeholder="your@email.com" [(ngModel)]="user.email"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Password\n			</ion-label>\n			<ion-input type="password" placeholder="" [(ngModel)]="user.password"></ion-input>\n		</ion-item>\n	</ion-list>\n	<button ion-button color="default" block (click)="onSubmit(user)">\n      Sign up\n    </button>\n	<button ion-button color="secondary" block (click)="onCancel()">\n      Cancel\n    </button>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\signup\signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup_signup__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading__ = __webpack_require__(70);
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
        selector: "page-login",template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\login\login.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>Login</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<ion-list>\n		<ion-item>\n			<ion-label>\n				Email\n			</ion-label>\n			<ion-input type="email" placeholder="your@email.com" [(ngModel)]="user.email"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label>\n				Password\n			</ion-label>\n			<ion-input type="password" placeholder="888888" [(ngModel)]="user.password"></ion-input>\n		</ion-item>\n	</ion-list>\n	<div class="spacer" style="height:40px;"></div>\n	<button ion-button color="stable" block (click)="onLogin()">\n      Log in\n    </button>\n	<button ion-button clear color="positive" block (click)="onSignup()">\n      Or create an account\n    </button>\n</ion-content>\n'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__report_report__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setting_setting__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lodge_lodge__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
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
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Data\Projects\Ionic\UniLodge\src\pages\tabs\tabs.html"*/'<ion-tabs selectedIndex="1">\n  <ion-tab [root]="tab3Root" tabTitle="Student" tabIcon="settings"></ion-tab>\n  <ion-tab [root]="tab1Root" tabTitle="SignIn" tabIcon="home" [tabBadge]="unlodgeCount" tabBadgeStyle="danger"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Report" tabIcon="document"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Data\Projects\Ionic\UniLodge\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Events */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(376);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_period_modal_period_modal__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_lodge_detail_lodge_detail__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_student_modal_student_modal__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_setting_setting__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_report_report__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_lodge_lodge__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tabs_tabs__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_loading_loading__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_http__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_database__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__share_data_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_lodge_form_lodge_form__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_call_number__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_sms__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__share_excel_service__ = __webpack_require__(808);
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
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_lodge_lodge__["a" /* LodgePage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_report_report__["a" /* ReportPage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_student_modal_student_modal__["a" /* StudentModalPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_loading_loading__["a" /* LoadingPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_lodge_form_lodge_form__["a" /* LodgeFormPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_lodge_detail_lodge_detail__["a" /* LodgeDetailPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_period_modal_period_modal__["a" /* PeriodModalPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_14__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {
                mode: "md",
                iconMode: "md",
                pageTransition: "md-transition"
            }),
            __WEBPACK_IMPORTED_MODULE_17_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_18_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_lodge_lodge__["a" /* LodgePage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_report_report__["a" /* ReportPage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_student_modal_student_modal__["a" /* StudentModalPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_loading_loading__["a" /* LoadingPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_lodge_form_lodge_form__["a" /* LodgeFormPage */],
            __WEBPACK_IMPORTED_MODULE_1__pages_lodge_detail_lodge_detail__["a" /* LodgeDetailPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_period_modal_period_modal__["a" /* PeriodModalPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_8__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_sms__["a" /* SMS */],
            __WEBPACK_IMPORTED_MODULE_25__share_excel_service__["a" /* ExcelService */],
            __WEBPACK_IMPORTED_MODULE_20__share_data_service__["a" /* DataService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 514:
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

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
    LoadingPage.prototype.show = function (msg) {
        if (msg === void 0) { msg = 'Please wait...'; }
        this.loading = this.loadingCtrl.create({
            spinner: "crescent",
            content: msg
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

/***/ }),

/***/ 808:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExcelService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xlsx__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xlsx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// const fs:string = cordova.file.dataDirectory;
// const fs: string = cordova.file.externalDataDirectory;

var ExcelService = (function () {
    function ExcelService() {
        this.sheetNames = [];
    }
    ExcelService.prototype.createXSLX = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            var ws_name = "report";
            var wb = {
                SheetNames: [],
                Sheets: {},
                Props: {}
            };
            var ws = _this.sheet_from_array_of_arrays(data, {});
            /* add worksheet to workbook */
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            var wbout = __WEBPACK_IMPORTED_MODULE_1_xlsx__["write"](wb, { bookType: 'xlsx', type: 'binary' });
            var xslxBlob = new Blob([_this.s2ab(wbout)], { type: "application/octet-stream" });
            resolve(xslxBlob);
        });
    };
    ExcelService.prototype.datenum = function (v, date1904) {
        if (date1904)
            v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30)).getTime()) / (24 * 60 * 60 * 1000);
    };
    ExcelService.prototype.sheet_from_array_of_arrays = function (data, opts) {
        var ws = {};
        var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R)
                    range.s.r = R;
                if (range.s.c > C)
                    range.s.c = C;
                if (range.e.r < R)
                    range.e.r = R;
                if (range.e.c < C)
                    range.e.c = C;
                var cell = { v: data[R][C] };
                if (cell.v == null)
                    continue;
                var cell_ref = __WEBPACK_IMPORTED_MODULE_1_xlsx__["utils"].encode_cell({ c: C, r: R });
                if (typeof cell.v === 'number')
                    cell.t = 'n';
                else if (typeof cell.v === 'boolean')
                    cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    //cell.z = XLSX.SSF._table[14];
                    cell.v = this.datenum(cell.v, null);
                }
                else
                    cell.t = 's';
                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000)
            ws['!ref'] = __WEBPACK_IMPORTED_MODULE_1_xlsx__["utils"].encode_range(range.s, range.e);
        return ws;
    };
    ExcelService.prototype.s2ab = function (s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };
    return ExcelService;
}());
ExcelService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ExcelService);

//# sourceMappingURL=excel-service.js.map

/***/ }),

/***/ 815:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 816:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(367);
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

/***/ })

},[371]);
//# sourceMappingURL=main.js.map