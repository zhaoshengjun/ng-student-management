import { ViewController } from "ionic-angular";
import { Period } from "./../../share/data/model";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { format } from "date-fns";

@Component({
  selector: "page-period-modal",
  templateUrl: "period-modal.html"
})
export class PeriodModalPage {
  holiday;
  student;
  mode = "add";

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.student = navParams.get("student");
    this.holiday = {
      startDate: format(new Date(), "YYYY-MM-DD"),
      endDate: format(new Date(), "YYYY-MM-DD")
    };
    let idx = navParams.get("index");
    if (!isNaN(idx)) {
      // means this is an edit operation
      this.mode = "edit";
      let { startDate, endDate } = this.student.holidayPeriods[idx];
      this.holiday = { startDate, endDate };
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PeriodModalPage");
  }

  onConfirm() {
    this.viewCtrl.dismiss(this.holiday);
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
