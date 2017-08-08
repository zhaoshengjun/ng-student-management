import { ViewController } from 'ionic-angular';
import { Period } from './../../share/data/model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-period-modal',
  templateUrl: 'period-modal.html',
})
export class PeriodModalPage {
  holiday: Period;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodModalPage');
    this.holiday.startDate = new Date();
    this.holiday.endDate = new Date();
  }

  onSubmit() {
    this.viewCtrl.dismiss(this.holiday);
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

}
