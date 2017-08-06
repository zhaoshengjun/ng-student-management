import { Student } from "./data/model";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";

import { getDateString } from "./common";

@Injectable()
export class DataService {
  students: Student[];
  lodgelist: any[];
  uid: string;
  today: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase
  ) {
    afAuth.authState.subscribe(user => {
      this.uid = user.uid;
    });
  }

  private convertFirebaseObject(obj: object, key: string) {
    return Object.assign({ key: key }, obj);
  }

  // students api
  checkLoginStatus() {
    if (!this.uid) {
      let user = this.afAuth.auth.currentUser;
      if (user) {
        this.uid = user.uid;
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  retriveData() {
    if (this.checkLoginStatus()) {
      let today = getDateString();
      this.afDB
        .list(`/${this.uid}/students`, { preserveSnapshot: true })
        .subscribe(snapshot => {
          console.log("Getting students snapshot:", snapshot);
          let stuTemp = [];
          snapshot.forEach(s => {
            stuTemp.push(this.convertFirebaseObject(s.val(), s.key));
          });
          this.students = stuTemp;
        });
      this.afDB
        .list(`/${this.uid}/lodgelists/${today}`, { preserveSnapshot: true })
        .subscribe(snapshot => {
          console.log("Getting lodgelists", snapshot);
          this.lodgelist = snapshot;
        });
    }
  }
  getStudents() {
    if (!this.students) {
      this.retriveData();
    }

    return new Promise((res, rej) => {
      if (this.students) {
        res(this.students);
      } else {
        rej("No data found");
      }
    });
  }

  getStudentById(id: string) {
    return this.students[0];
    // return this.students.filter( s => s.$key === id);
  }

  updateStudentInfo(studentId: string, newVal: Student) {
    // 1. update based on new value;
    // 2. if holiday period has been updated, needs to check the lodge list as well
    // return this.students
    // .update(studentId, newVal)
  }

  addStudent(student: Student) {
    // 1. add to students
    // 2. check if he/she needs to be lodged on today's list.
    // return this.students.push(student);
  }

  archiveStudent(studentId: string) {
    // return this.students.update(studentId, {
    //   archived: true,
    //   archivedDate: new Date()
    // })
  }

  // lodge list api
  getList(ref: string): FirebaseListObservable<any> {
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
    } else {
      return null;
    }
  }

  buildLodgeList() {}
}
