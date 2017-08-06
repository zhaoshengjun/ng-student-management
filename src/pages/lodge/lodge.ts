import { Student } from "./../../share/data/model";
import { AngularFireAuth } from "angularfire2/auth";
// import { Student } from "./../../share";
// import { LoginPage } from "./../login/login";
import { Component } from "@angular/core";
import { NavController, App, LoadingController } from "ionic-angular";
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

// when user logged in, the app should check if there's a today's list already exists
//  if yes, use the list. otherwise, generate the list, save it and use it
//  OR: use ListService to get the list and all the logic is inside the ListService
//  only submit to LogedList/UnlogedList and let the UI react to the data when changing.

@Component({
  selector: "page-lodge",
  templateUrl: "lodge.html"
})
export class LodgePage {
  selectedSegment = "unlodged";
  wholeList: Rx.Observable<any>;
  userId: string;
  today: string;
  site: FirebaseObjectObservable<any>;
  private loader: LoadingPage;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private dbService: DataService,
    private _app: App
  ) {
    // console.log(this.dbService);
  }

  ionViewDidLoad() {
    this.loader = new LoadingPage(this.loadingCtrl);
    this.today = "20170802";
    this.userId = this.dbService.uid;
    const todayRef = `/${this.userId}/lodgelists/${this.today}`;
    let listRef = this.afDB.list(todayRef);
    let listSubject = new ReplaySubject();
    let db = this.afDB.database.ref();
    let fetchStudentInfo = (stu, cb) => {
      let stuRef = db.child(`/${this.userId}/students/${stu.studentId}`);
      stuRef.once("value", cb);
    };
    this.wholeList = listRef.map(snap => {
      let l = [];
      snap.forEach(stu => {
        fetchStudentInfo(stu, data => {
          console.log("fetch:", data.val());
          let student = Object.assign(
            data.val(),
            { id: data.key },
            { lodgeStatus: stu.status }
          );
          l.push(student);
        });
      });
      return l;
    });

    this.site = this.afDB.object(`/${this.userId}/site`);
  }

  filterList(filter: string): Rx.Observable<any> {
    return this.wholeList.map(d => {
      // console.log("data:", d);
      return d.filter(a => {
        // console.log("item: ", a);
        return a.status === filter;
      });
    });
  }

  onLogout() {
    const root = this._app.getRootNavs()[0];
    root.popToRoot();
  }

  onSegmentChanged(newVal: string) {
    this.selectedSegment = newVal;
    console.log(this.selectedSegment);
  }
}
