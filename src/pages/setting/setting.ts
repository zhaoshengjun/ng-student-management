import { StudentModalPage } from "./../student-modal/student-modal";
import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  onAdd() {
    // show add modal
    let modal = this.modalCtrl.create(StudentModalPage, {});
    modal.present();
  }
}
