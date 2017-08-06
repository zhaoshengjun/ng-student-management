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

  show() {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Please wait..."
    });
    this.loading.present();
  }

  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
