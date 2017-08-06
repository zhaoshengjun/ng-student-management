import { TabsPage } from "./../tabs/tabs";
import { SignupPage } from "./../signup/signup";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { LoadingPage } from "../loading/loading";
import { User } from "../../share/data/model";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user: User = {
    email: "a@a.com",
    password: "111111",
    site: ""
  };
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private afAuth: AngularFireAuth) { }

  ionViewDidLoad() {

  }

  onLogin() {

    let loader = new LoadingPage(this.loadingCtrl)
    loader.show();
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        loader.hide();
        console.log(res);
        this.navCtrl.push(TabsPage);
      }, (err) => {
        loader.hide();
        console.log(err)
        // show error message
      })
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
