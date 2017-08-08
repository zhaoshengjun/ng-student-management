import { LoadingPage } from "./../loading/loading";
import { Student } from "./../../share/data/model";
import { Component } from "@angular/core";
import {
  NavController,
  ViewController,
  NavParams,
  LoadingController
} from "ionic-angular";

import firebase from "firebase";

@Component({
  selector: "page-lodge-form",
  templateUrl: "lodge-form.html"
})
export class LodgeFormPage {
  student: Student;
  studentRef: string;
  index: number;
  error: boolean = false;
  errorMessage: string = "";
  loader: LoadingPage;
  private db: firebase.database.Database;

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.student = this.navParams.get("student");
    this.studentRef = this.navParams.get("studentRef");
    this.index = this.navParams.get("index");
    this.db = firebase.database();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LodgeFormPage");
    this.loader = new LoadingPage(this.loadingCtrl);
  }

  onSubmit() {
    // submit the record
    this.loader.show();
    console.log("submit signin information");

    console.log("index", this.index);
    // should show progress bar
    // also show error/success message to let user know.
    let listRef = this.db.ref(this.studentRef);
    listRef
      .child(this.index.toString())
      .update({ lodgeStatus: "lodged", reason: "signature" })
      .then(
        _ => {
          this.loader.hide();
          this.viewCtrl.dismiss();
        },
        err => {
          this.loader.hide();
          this.error = true;
          this.errorMessage = err.message;
        }
      );
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
  }

  onCancel() {
    console.log("Cancel signin");
    this.viewCtrl.dismiss();
  }
}
