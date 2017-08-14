import { Component } from '@angular/core';
import { LoadingController, Loading } from "ionic-angular";

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  private loading: Loading;
  constructor(public loadingCtrl: LoadingController) {
  }

  show(msg: string = 'Please wait...') {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: msg
    });
    this.loading.present();
  }

  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
