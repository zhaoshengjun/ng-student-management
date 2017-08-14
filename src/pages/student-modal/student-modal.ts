import { LoadingPage } from "./../loading/loading";
import { format } from "date-fns";
import { DataService } from "./../../share/data-service";
import { Student } from "./../../share/data/model";
import { Component } from "@angular/core";
import { NavParams, ViewController, LoadingController } from "ionic-angular";
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
    private dbService: DataService,
    private loadCtrl: LoadingController,
    private navParams: NavParams
  ) {}

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

  onConfirm() {
    // should update/add the student data
    // delete/archive will be performed in the list view instead of this detail view
    // for unarchived student, there's archive option
    // for archived student, there's unarchive option
    this.loader.show();

    this.student.startDate = new Date(this.startDate);
    this.student.endDate = new Date(this.endDate);
    this.student.dateOfBirth = new Date(this.dateOfBirth);
    let listRef = this.db.ref(this.studentRef);
    if (this.mode == "add") {
      let newKey = listRef.push().key;
      this.student.id = newKey;
      let updateData = {};
      updateData[newKey] = this.student;
      // also need to check if needs to be inserted into today's lodge list.
      listRef.update(updateData).then(
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
    } else {
      // this.dbService.updateStudentInfo(this.student.$key, newVal)
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
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  onAddHoliday() {
    console.log("Add holiday");
  }

  onEditHoliday() {
    console.log("Edit holiday");
  }

  onDeleteHoliday() {
    console.log("Delete holiday");
  }
}
