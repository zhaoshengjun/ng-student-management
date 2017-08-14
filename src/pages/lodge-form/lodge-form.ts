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
import { ZTToast } from "../toast/zttoast";
import { b64ToBlob } from "../../share/common";

declare let SignaturePad: any;

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
  uid: string;
  pad;
  canvas;
  picData;
  url: string;
  private _toast: ZTToast;
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
    this.uid = firebase.auth().currentUser.uid;
    this._toast = new ZTToast();
  }

  resizeCanvas() {
    let ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext("2d").scale(ratio, ratio);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LodgeFormPage");
    this.loader = new LoadingPage(this.loadingCtrl);

    this.canvas = document.getElementById("canvas");
    this.pad = new SignaturePad(this.canvas);
    window.onresize = this.resizeCanvas;
    this.resizeCanvas();
  }

  onSubmit() {
    console.log("submit signin information");
    console.log("index", this.index);
    this.savePic();
  }

  onCancel() {
    console.log("Cancel signin");
    this.viewCtrl.dismiss();
  }

  savePic() {
    let pic = this.pad.toDataURL();
    let [contentType, b64Data] = pic.split(",");
    let picData = b64ToBlob(b64Data, contentType);
    if (this.uid) {
      this._toast.info("Start save record information...");
      let ref = firebase.storage().ref("/" + this.uid);
      let generatedPicName = this.generatePictureName();
      let meta = {
        contentType: "image/jpeg",
        customMetadata: {
          activity: "lodge"
        }
      };

      const showUploadError = err => {
        this._toast.error(err.message);
      };

      ref.child(generatedPicName).put(picData, meta).then(
        snapshot => {
          console.log("snapshot:", snapshot);
          this.url = snapshot.downloadURL;
          this.updateLodgeStatus();
        },
        err => {
          showUploadError(err);
        }
      );
    }
  }

  updateLodgeStatus() {
    let listRef = this.db.ref(this.studentRef);
    listRef
      .child(this.index.toString())
      .update({
        lodgeStatus: "lodged",
        reason: "signature",
        timestamp: new Date().toISOString(),
        signature: this.url
      })
      .then(
      _ => {
        this._toast.success("Saved successfully!");
        this.viewCtrl.dismiss();
      },
      err => {
        this._toast.error(err.message);
      }
      );
  }

  generatePictureName() {
    let d = new Date().valueOf();
    return this.uid + d + ".jpg";
  }
}
