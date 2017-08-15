import { format } from "date-fns";
import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "page-lodge-detail",
  templateUrl: "lodge-detail.html"
})
export class LodgeDetailPage {
  student;
  hasSignature: boolean = true;
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.student = navParams.get("student");
    if (this.student.reason == "InHoliday") {
      this.hasSignature = false;
    } else if (this.student.reason == "signature") {
      this.hasSignature = true;
      this.student.timestampStr = format(
        this.student.timestamp,
        "YYYY/MM/DD HH:mm:ss"
      );
    }
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
