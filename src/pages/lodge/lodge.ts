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

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private dbService: DataService,
    private events: Events,
    private _app: App
  ) {
    this.db = this.afDB.database;
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
              status,
              signature,
              timestamp
            } = this.checkIfNeedToLodge(s);
            if (needLodge) {
              let lodgeInfo = {
                studentId: s.id,
                lodgeStatus: status,
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
    let status = "unlodged";
    let signature = "";
    let timestamp = "";

    if (isWithinRange(this.selectedDate, student.startDate, student.endDate)) {
      let { reason, status, signature } = this.checkHolidays(student);
    } else if (isBefore(student.endDate, this.selectedDate)) {
      // update student's status to archived.
      needLodge = false;
      status = "";
      let studentKey = student.id;
      let studentRef = this.db.ref(`/${this.userId}/students/${studentKey}`);
      studentRef.update({
        status: "archived"
      });
    } else if (isBefore(this.selectedDate, student.startDate)) {
      needLodge = false;
      status = "";
    }
    return { needLodge, reason, status, signature, timestamp };
  }

  checkHolidays(student) {
    let val = {
      reason: "",
      status: "unlodged",
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
          val.status = "lodged";
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

  onSignIn(student, slidingItem: ItemSliding, index) {
    slidingItem.close();
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
  onText(student, slidingItem: ItemSliding) {
    slidingItem.close();
    console.log("Text with :", student);
    //  Text student
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
        handler: (data: any) => {
          console.log("Radio data:", data);
          // data is the selected phone no.
          // make a call
        }
      });
      alert.present();
    } else {
      let phone = student.phone || student.guardianPhone;
      // make a call
    }
  }
  onCall(student, slidingItem: ItemSliding) {
    slidingItem.close();
    console.log("Call with :", student);
    //  Call student
    // if have more than 1 phone numbers in student record,
    //  show a popup window to choose.
  }
  onEmail(student, slidingItem) {
    slidingItem.close();
    console.log("Email with :", student);
    //  Email student
  }

  onShowDetail(student) {
    if (student.lodgeStatus == "lodged") {
      // show lodged detail information
      let lodgeDetail = this.modalCtrl.create(LodgeDetailPage, { student });
      lodgeDetail.present();
    }
  }
}
