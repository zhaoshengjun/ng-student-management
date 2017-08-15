import { PeriodModalPage } from "./../period-modal/period-modal";
import { LoadingPage } from "./../loading/loading";
import { format, isWithinRange, isBefore } from "date-fns";
import { Student } from "./../../share/data/model";
import { Component } from "@angular/core";
import {
  NavParams,
  ViewController,
  LoadingController,
  ModalController,
  AlertController
} from "ionic-angular";
import * as firebase from "firebase";

@Component({
  selector: "page-student-modal",
  templateUrl: "student-modal.html"
})
export class StudentModalPage {
  confirmTitle: string = "Save";
  isArchived: boolean = false;
  student: Student = new Student();
  mode: string = "add";
  startDate: string = "2017-07-01";
  endDate: string = "2017-07-05";
  dateOfBirth: string;
  studentRef: string;
  index: string;
  db: firebase.database.Database;
  loader: LoadingPage;
  error: boolean = false;
  errorMessage: string = "";

  constructor(
    private viewCtrl: ViewController,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navParams: NavParams
  ) { }

  ionViewDidLoad() {
    let title = this.navParams.get("confirmTitle");
    if (title) this.confirmTitle = title;

    this.db = firebase.database();
    let uid = firebase.auth().currentUser.uid;
    this.studentRef = `/${uid}/students`;
    let student = this.navParams.get("student");
    if (student) {
      this.mode = "edit";
      this.student = student;
      this.startDate = format(this.student.startDate, "YYYY-MM-DD");
      this.endDate = format(this.student.endDate, "YYYY-MM-DD");
      console.log("startDate:", this.startDate);
      console.log("endDate:", this.endDate);

      this.index = this.navParams.get("index");
    }
    this.isArchived = this.student.status == "achived";
    this.loader = new LoadingPage(this.loadCtrl);
  }

  clickedAvatar() {
    console.log("needs to change avatar");
    // access the photo lib to change the avatar.
    // this can be saved to the database.
  }

  validateDates() {
    // 1. start date >= today
    // 2. end date >= start date
    // 3. holiday start date >= today
    // 4. holiday end date >= holiday start date
    let hasError = false;
    let errors = [];
    let today = new Date();
    this.student.startDate = new Date(this.startDate);
    this.student.endDate = new Date(this.endDate);
    this.student.dateOfBirth = new Date(this.dateOfBirth);

    if (isBefore(this.student.startDate, today)) {
      hasError = true;
      errors.push({
        type: "warning",
        message: "Start date is before today, but we cannot change historical sign in records"
      });
    }

    if (isBefore(this.student.endDate, this.student.startDate)) {
      hasError = true;
      errors.push({
        type: "error",
        message: "End date should no later than start date"
      });
    }
    return { hasError, errors }
  }

  onConfirm() {
    // should update/add the student data
    // delete/archive will be performed in the list view instead of this detail view
    // for unarchived student, there's archive option
    // for archived student, there's unarchive option

    let { hasError, errors } = this.validateDates()
    if (!hasError) {
      this.loader.show();
      this.updateStudentStatus();

      let listRef = this.db.ref(this.studentRef);
      if (this.mode == "add") {
        let newKey = listRef.push().key;
        this.student.id = newKey;
        let updateData = {};
        updateData[newKey] = this.student;
        // also need to check if needs to be inserted into today's lodge list.

        listRef.update(updateData).then(
          _ => {
            this.addIntoLodgeList(this.student);
            this.loader.hide();
            this.viewCtrl.dismiss();
          },
          err => {
            this.loader.hide();
            this.error = true;
            this.errorMessage = err.message;
            console.log("error when saving student data", err);
          }
        );
      } else {
        listRef.child(this.student.id).update(this.student).then(
          _ => {
            this.loader.hide();
            this.viewCtrl.dismiss();
          },
          err => {
            this.loader.hide();
            this.error = true;
            this.errorMessage = err.message;
            console.log("error when saving student data", err);
          }
        );
      }
    } else {
      let msg = this.buildErrorMessages(errors);
      let confirm = this.alertCtrl.create({
        title: 'Errors',
        subTitle: msg,
        buttons: ['OK']
      });
      confirm.present();
    }

  }

  buildErrorMessages(errors) {
    let msg = "There are following errors: \n"
    for (let err of errors) {
      msg = msg + " - " + err.message + '\n';
    }

    return msg;
  }

  updateStudentStatus() {
    let keyDate = new Date();
    if (isBefore(this.student.endDate, keyDate)) {
      this.student.status = "archived";
    } else {
      this.student.status = "active";
    }
  }

  addIntoLodgeList(student) {
    // check if current date is between start date and end date.
    let lodgeList = [];
    let {
      needLodge,
      reason,
      lodgeStatus,
      signature,
      timestamp
    } = this.checkIfNeedToLodge(student);
    if (needLodge) {
      let lodgeInfo = {
        studentId: student.id,
        lodgeStatus,
        reason,
        signature,
        timestamp
      };
      console.log("lodgeInfo:", lodgeInfo);
      lodgeList.push(lodgeInfo);
    }
    // push to firebase
    let uid = firebase.auth().currentUser.uid;
    let dateString = format(new Date(), "YYYYMMDD");
    let lodgeListRefString = `/${uid}/lodgelists/${dateString}`;
    let listRef = firebase.database().ref(lodgeListRefString);
    listRef.push(lodgeList);
  }

  checkIfNeedToLodge(student) {
    let needLodge = true;
    let reason = "";
    let lodgeStatus = "unlodged";
    let signature = "";
    let timestamp = "";
    let uid = firebase.auth().currentUser.uid;

    let keyDate = new Date();

    if (isWithinRange(keyDate, student.startDate, student.endDate)) {
      let lodgeInfo = this.checkHolidays(student);
      reason = lodgeInfo.reason;
      lodgeStatus = lodgeInfo.lodgeStatus;
      signature = lodgeInfo.signature;
      timestamp = lodgeInfo.timestamp;
    } else if (isBefore(student.endDate, keyDate)) {
      // update student's status to archived.
      needLodge = false;
      lodgeStatus = "";
      let studentKey = student.id;
      let studentRef = this.db.ref(`/${uid}/students/${studentKey}`);
      studentRef.update({
        status: "archived"
      });
    } else if (isBefore(keyDate, student.startDate)) {
      needLodge = false;
      lodgeStatus = "";
    }
    return { needLodge, reason, lodgeStatus, signature, timestamp };
  }

  checkHolidays(student) {
    let val = {
      reason: "",
      lodgeStatus: "unlodged",
      signature: "",
      timestamp: ""
    };
    let keyDate = new Date();
    let holidays = student.holidayPeriods;
    if (holidays && holidays.length > 0) {
      for (let i = 0; i < holidays.length; i++) {
        let holiday = holidays[i];
        if (isWithinRange(keyDate, holiday.startDate, holiday.endDate)) {
          val.reason = "InHoliday";
          val.lodgeStatus = "lodged";
          val.signature = `${format(
            holiday.startDate,
            "YYYY-MM-DD"
          )} ~ ${format(holiday.endDate, "YYYY-MM-DD")}`;
          val.timestamp = new Date().toISOString();
          break;
        }
      }
    }
    return val;
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onAddHoliday() {
    console.log("Add holiday");

    let modal = this.modalCtrl.create(PeriodModalPage, {
      student: this.student
    });
    modal.onDidDismiss(data => {
      if (data) {
        let { startDate, endDate } = data;
        if (!this.student.holidayPeriods) {
          this.student.holidayPeriods = [];
        }
        this.student.holidayPeriods.push({ startDate, endDate });
      }
    });
    modal.present();
  }

  onEditHoliday(index) {
    console.log("Edit holiday");
    let modal = this.modalCtrl.create(PeriodModalPage, {
      student: this.student,
      index
    });
    modal.present();
  }

  onDeleteHoliday(index) {
    console.log("Delete holiday");
    let confirm = this.alertCtrl.create({
      title: "Confirm",
      message: "Are you sure to delete this holiday period?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Confirm",
          handler: () => {
            this.student.holidayPeriods.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }
}
