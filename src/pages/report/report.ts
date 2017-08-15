import { SignupPage } from "./../signup/signup";
import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import * as firebase from "firebase";
import Rx from "rxjs/Rx";
import { convertFirebaseObjectToArray } from "../../share/common";
import { format, isBefore } from "date-fns";

@Component({
  selector: "page-report",
  templateUrl: "report.html"
})
export class ReportPage {
  searchTerm: string = "byDate";
  allData: Array<any>;
  uid: string;
  lodgeListsRefString: string;
  studentsRefString: string;
  searchDate: string;
  searchPerson: string;
  searchUniversity: string;
  students: Array<any>;
  lodgeLists: Array<any>;
  resultData: Array<any>;
  loaded: boolean = false;
  noData: boolean;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.uid = firebase.auth().currentUser.uid;
    this.lodgeListsRefString = `/${this.uid}/lodgelists`;
    this.studentsRefString = `/${this.uid}/students`;
    this.getData().then(val => {
      this.convertFirebaseData(val);
    });

    this.searchUniversity = "UQ";
    this.searchDate = format(new Date("2017-08-10"), 'YYYY-MM-DD');
  }

  convertFirebaseData(snapshot) {
    this.lodgeLists = snapshot[0].val();
    this.students = convertFirebaseObjectToArray(snapshot[1].val());
    this.loaded = true;
  }

  onChange(event) {
    this.resultData = [];
  }

  onSearch() {
    this.resultData = [];

    // check if the date is after today.

    if (this.searchTerm !== "byPerson" && isBefore(new Date(), this.searchDate)) {
      let confirm = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Cannot search data later than today.",
        buttons: ['OK']
      });
      confirm.present();
    } else {
      if (!this.loaded) {
        this.getData().then(snap => {
          this.convertFirebaseData(snap);
          this.doSearch();
        });
      } else {
        this.doSearch();
        this.formatResultData();
        console.log("resultData:", this.resultData);
      }
    }

  }

  formatResultData() {
    let arr = this.resultData;
    if (arr && arr.length > 0) {
      this.resultData = arr.map(s => {
        let { date, timestamp, startDate, endDate, dateOfBirth } = s;
        date && (date = format(new Date(date), 'YYYY/MM/DD'));
        startDate && (startDate = format(new Date(startDate), 'YYYY/MM/DD'));
        endDate && (endDate = format(new Date(endDate), 'YYYY/MM/DD'));
        dateOfBirth && (dateOfBirth = format(new Date(dateOfBirth), 'YYYY/MM/DD'));
        timestamp && (timestamp = format(new Date(timestamp), 'HH:MM:SS'));
        return Object.assign(s, { date, timestamp, startDate, endDate, dateOfBirth })
      })

    }
  }

  doSearch() {
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
  }

  searchByDate() {
    const findStudentInfo = sid => {
      return this.students.filter(s => s.id === sid)[0];
    };

    let keyDate = format(new Date(this.searchDate), "YYYYMMDD");
    let lodgelist = this.lodgeLists[keyDate];
    if (lodgelist) {
      this.noData = false;
      this.resultData = lodgelist
        .map(l => {
          let studentInfo = findStudentInfo(l.studentId);
          return this.mergeInfo(studentInfo, l, this.searchDate);
        })
        .filter(e => e);
    } else {
      this.noData = true;
    }
  }

  mergeInfo(student, lodgeInfo, date) {
    let { lodgeStatus, reason, signature, timestamp, reminderTime } = lodgeInfo;
    return Object.assign(student, {
      date,
      lodgeStatus,
      reason,
      signature,
      timestamp,
      reminderTime
    });
  }

  searchByPerson() {
    let flatten = arr => {
      let result = [];
      for (let outer of arr) {
        for (let inner of outer) {
          if (inner) {
            result.push(inner);
          }
        }
      }
      return result;
    };
    let name = this.searchPerson.trim();
    let result = this.students.filter(s => s.name.includes(name)).map(s => {
      let lodgeInfos = [];
      for (let keydate in this.lodgeLists) {
        let list = this.lodgeLists[keydate];
        let date = format(keydate, 'YYYY-MM-DD');
        let result = list.filter(l => l.studentId == s.id)[0];
        if (result) {
          lodgeInfos.push(this.mergeInfo(s, result, date));
        }
      }
      return lodgeInfos;
    });

    this.resultData = flatten(result);
  }

  searchByUniversity() {
    const findLodgeInfoByStudentId = (sid, keydate) => {
      let date = format(new Date(keydate), "YYYYMMDD");
      let lodgelist = this.lodgeLists[date];
      return lodgelist.filter(s => s.studentId === sid)[0];
    };
    let university = this.searchUniversity.trim();
    this.resultData = this.students
      .filter(s => s.university == university)
      .map(s => {
        let lodgeInfo = findLodgeInfoByStudentId(s.id, this.searchDate);
        if (lodgeInfo) {
          return this.mergeInfo(s, lodgeInfo, this.searchDate);
        }
      })
      .filter(e => e);
  }

  getData() {
    let lodgeLists = [];
    let students = [];

    let lodgeListsRef = firebase.database().ref(this.lodgeListsRefString);
    let studentsRef = firebase.database().ref(this.studentsRefString);

    let lodgeStream = Rx.Observable.from(lodgeListsRef.once("value"));

    let studentsStream = Rx.Observable.from(studentsRef.once("value"));

    return Rx.Observable.forkJoin(lodgeStream, studentsStream).toPromise();
  }

  onExport() {
    console.log("export report");
  }
}
