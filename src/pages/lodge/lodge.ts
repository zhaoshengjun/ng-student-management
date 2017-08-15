import { ZTToast } from "./../toast/zttoast";
import { LodgeDetailPage } from "./../lodge-detail/lodge-detail";
import { SignupPage } from "./../signup/signup";
import { Student } from "./../../share/data/model";
import { AngularFireAuth } from "angularfire2/auth";
import { Component } from "@angular/core";
import {
  NavController,
  App,
  LoadingController,
  ModalController,
  AlertController,
  Events,
  ItemSliding
} from "ionic-angular";
import { LoadingPage } from "../loading/loading";
import {
  FirebaseListObservable,
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database";

import "rxjs/add/operator/map";
import { ReplaySubject } from "rxjs/ReplaySubject";
import * as firebase from "firebase";
// import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs";
import { DataService } from "../../share/data-service";
import {
  getDateString,
  convertFirebaseObjectToArray
} from "../../share/common";
import { isWithinRange, format, isBefore } from "date-fns";
import { LodgeFormPage } from "../lodge-form/lodge-form";

import { EmailComposer } from "@ionic-native/email-composer";
import { SMS } from "@ionic-native/sms";
import { CallNumber } from "@ionic-native/call-number";

@Component({
  selector: "page-lodge",
  templateUrl: "lodge.html"
})
export class LodgePage {
  selectedSegment = "unlodged";
  wholeList: Rx.Observable<any>;
  userId: string;
  selectedDate: Date;
  dateString: string;
  site: FirebaseObjectObservable<any>;
  db: firebase.database.Database;
  private loader: LoadingPage;
  private toast: ZTToast;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private dbService: DataService,
    private events: Events,
    private email: EmailComposer,
    private sms: SMS,
    private call: CallNumber,
    private _app: App
  ) {
    this.db = this.afDB.database;
    this.toast = new ZTToast();
  }

  ionViewDidLoad() {
    this.loader = new LoadingPage(this.loadingCtrl);
    this.selectedDate = new Date();
    this.dateString = format(this.selectedDate, "YYYYMMDD");
    this.userId = this.dbService.uid;
    const todayRef = `/${this.userId}/lodgelists/${this.dateString}`;
    let listRef = this.afDB.list(todayRef);
    let fetchStudentInfo = (stu, cb) => {
      let stuRef = this.db
        .ref()
        .child(`/${this.userId}/students/${stu.studentId}`);
      stuRef.once("value", cb);
    };
    this.wholeList = listRef.map(snap => {
      if (snap.length == 0) {
        // this is the 1st time to use for today.
        // should generate a list
        this.generateList();
      } else {
        // list already exists.
        let list = [];
        snap.forEach(stu => {
          // console.log('stu:', stu);
          fetchStudentInfo(stu, data => {
            // console.log("fetch:", data.val());
            let stud = data.val();
            let student = Object.assign(stud, {
              lodgeStatus: stu.lodgeStatus,
              reason: stu.reason,
              signature: stu.signature,
              timestamp: stu.timestamp
            });
            // console.log('generate info: ', student);
            list.push(student);
          });
        });
        return list;
      }
    });
    this.site = this.afDB.object(`/${this.userId}/site`);
    this.wholeList.subscribe(d => {
      console.log("whole list", d);
      if (d) {
        if (d.length > 0) {
          let unlodgeList = d.filter(a => a.lodgeStatus === "unlodged");
          this.events.publish("unlodge:count", unlodgeList.length);
        }
      }
    });
  }

  generateList() {
    // get full students list

    let studentRefString = `/${this.userId}/students`;
    let studentRef = this.db.ref(studentRefString);
    // let studentsRef = this.afDB.list(studentRefString);
    // check each of them should be lodged
    let lodgeListRefString = `/${this.userId}/lodgelists/${this.dateString}`;
    let lodgeListRef = this.db.ref(lodgeListRefString);
    // let lodgeListRef = this.afDB.list(lodgeListRefString);
    let listRef = this.afDB.database.ref(lodgeListRefString);
    studentRef.once("value", snap => {
      console.log(snap.val());
      let stuSnap = snap.val();
      let students = convertFirebaseObjectToArray(stuSnap);
      console.log("students:", students);
      let lodgeList = [];
      if (students) {
        if (students.length > 0) {
          students.filter(s => s.status === "active").forEach(s => {
            console.log("student:", s, "key:", s.id);
            let {
              needLodge,
              reason,
              lodgeStatus,
              signature,
              timestamp
            } = this.checkIfNeedToLodge(s);
            if (needLodge) {
              let lodgeInfo = {
                studentId: s.id,
                lodgeStatus,
                reason,
                signature,
                timestamp
              };
              console.log("lodgeInfo:", lodgeInfo);
              lodgeList.push(lodgeInfo);
            }
          });
          listRef.update(lodgeList);
        }
      }
    });
  }

  checkIfNeedToLodge(student) {
    let needLodge = true;
    let reason = "";
    let lodgeStatus = "unlodged";
    let signature = "";
    let timestamp = "";

    if (isWithinRange(this.selectedDate, student.startDate, student.endDate)) {
      let lodgeInfo = this.checkHolidays(student);
      reason = lodgeInfo.reason;
      lodgeStatus = lodgeInfo.lodgeStatus;
      signature = lodgeInfo.signature;
      timestamp = lodgeInfo.timestamp;
    } else if (isBefore(student.endDate, this.selectedDate)) {
      // update student's status to archived.
      needLodge = false;
      lodgeStatus = "";
      let studentKey = student.id;
      let studentRef = this.db.ref(`/${this.userId}/students/${studentKey}`);
      studentRef.update({
        status: "archived"
      });
    } else if (isBefore(this.selectedDate, student.startDate)) {
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
    let holidays = student.holidayPeriods;
    if (holidays && holidays.length > 0) {
      for (let i = 0; i < holidays.length; i++) {
        let holiday = holidays[i];
        if (
          isWithinRange(this.selectedDate, holiday.startDate, holiday.endDate)
        ) {
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

  onLogout() {
    const root = this._app.getRootNavs()[0];
    root.popToRoot();
  }

  onSegmentChanged(newVal: string) {
    this.selectedSegment = newVal;
    console.log(this.selectedSegment);
  }

  onSignIn(student, index) {
    console.log("Sign in with :", student);
    // should show sign in form to collect signature
    //  and save it to the database
    let studentRef = `/${this.userId}/lodgelists/${this.dateString}`;
    let signInForm = this.modalCtrl.create(LodgeFormPage, {
      student,
      studentRef,
      index
    });
    signInForm.present();
  }
  onText(student, index) {
    console.log("Text with :", student);
    //  Text student
    let textStudent = phoneNumber => {
      this.sms
        .send(phoneNumber, "This is a reminder from UniLodge.")
        .then(_ => {
          this.updateReminderInfo(index, "text");
        })
        .catch(err => {
          this.toast.error(
            "Error when sending text. Please check your security settings."
          );
        });
    };

    this.choosePhoneNumber(student, textStudent);
  }

  choosePhoneNumber(student, cb) {
    if (student.phone && student.guardianPhone) {
      // if have more than 1 phone numbers in student record,
      //  show a popup window to choose.
      let alert = this.alertCtrl.create();
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
        handler: (phoneNumber: any) => {
          console.log("Radio data:", phoneNumber);
          cb(phoneNumber);
        }
      });
      alert.present();
    } else {
      let phoneNumber = student.phone || student.guardianPhone;
      cb(phoneNumber);
    }
  }

  onCall(student, index) {
    console.log("Call with :", student);
    //  Call student
    // if have more than 1 phone numbers in student record,
    //  show a popup window to choose.
    let callStudent = phoneNumber => {
      this.call
        .callNumber(phoneNumber, true)
        .then(() => {
          this.updateReminderInfo(index, "call");
        })
        .catch(err => {
          this.toast.error(
            "Error when making a call. Please check your security settings."
          );
        });
    };

    this.choosePhoneNumber(student, callStudent);
  }
  onEmail(student, index) {
    //  Email student
    this.email.isAvailable().then(available => {
      if (available) {
        this.email
          .open({
            app: "mailto",
            to: student.email,
            subject: "Reminder",
            body: "This is a reminder from UniLodge."
          })
          .then(() => {
            this.toast.success("Email sent successfully!", 500);
            this.updateReminderInfo(index, "email");
          })
          .catch(err => {
            this.toast.error(
              "Error when sending email. Please check your security settings."
            );
          });
      }
    });
  }

  onShowDetail(student) {
    if (student.lodgeStatus == "lodged") {
      // show lodged detail information
      let lodgeDetail = this.modalCtrl.create(LodgeDetailPage, { student });
      lodgeDetail.present();
    }
  }

  updateReminderInfo(index, remindMethod = "text", reminderTime = new Date()) {
    let studentRefString = `/${this.userId}/lodgelists/${this.dateString}`;
    let studentRef = this.db.ref(studentRefString);
    studentRef.child(index).update({
      remindMethod,
      reminderTime
    });
  }
}
