import { Student } from "./../../share/data/model";
import { AngularFireAuth } from "angularfire2/auth";
// import { Student } from "./../../share";
// import { LoginPage } from "./../login/login";
import { Component } from "@angular/core";
import {
  NavController,
  App,
  LoadingController,
  ModalController,
  AlertController,
  Events
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
import { getDateString, convertFirebaseObject } from "../../share/common";
import { isWithinRange, format } from "date-fns";
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
              reason: stu.reason
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
      if (d.length > 0) {
        let unlodgeList = d.filter(a => a.lodgeStatus === 'unlodged');
        this.events.publish("unlodge:count", unlodgeList.length);
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
      let students = snap.val();
      let lodgeList = [];
      students.filter(s => s.status === "active").forEach(s => {
        console.log("student:", s, "key:", s.id);
        let { reason, status } = this.checkIfNeedToLodge(s);
        let lodgeInfo = {
          studentId: s.id,
          lodgeStatus: status,
          reason: reason
        };
        console.log("lodgeInfo:", lodgeInfo);
        lodgeList.push(lodgeInfo);
      });
      listRef.update(lodgeList);
    });
  }

  checkIfNeedToLodge(student) {
    let reason = "";
    let status = "unlodged";

    let holidays = student.holidayPeriods;
    if (holidays && holidays.length > 0) {
      for (let i = 0; i < holidays.length; i++) {
        let holiday = holidays[i];
        if (
          isWithinRange(this.selectedDate, holiday.startDate, holiday.endDate)
        ) {
          reason = "InHoliday";
          status = "lodged";
          break;
        }
      }
    }

    return { reason, status };
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
  onText(student) {
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
  onCall(student) {
    console.log("Call with :", student);
    //  Call student
    // if have more than 1 phone numbers in student record,
    //  show a popup window to choose.
  }
  onEmail(student) {
    console.log("Email with :", student);
    //  Email student
  }
}
