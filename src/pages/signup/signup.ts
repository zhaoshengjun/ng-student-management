import { User } from "./../../share/data/model";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  user: User = {
    email: "",
    password: "",
    site: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFireAuth
  ) {}

  onSubmit(user: User) {
    // validate first
    // though user info has been posted to firebase, no user data can be accessed yet.
    this.af.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(
        data => {
          // should disable user before manuall verificiation has been confirmed.
          console.log(data);
          //the page doesn't auto refresh, so we can show the message.
        },
        err => {
          // show error message
          console.log(err);
        }
      )
      .catch(err => {});
  }

  onCancel() {
    this.navCtrl.pop();
  }
}
