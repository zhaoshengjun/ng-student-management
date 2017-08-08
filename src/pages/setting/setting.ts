import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { StudentModalPage } from "./../student-modal/student-modal";
import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  userId: string;
  students;
  activeOnly: boolean = false
  querySubject: BehaviorSubject<any>;
  queryOpts = {};


  constructor(
    public navCtrl: NavController,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
    this.querySubject = new BehaviorSubject({});
    this.userId = this.afAuth.auth.currentUser.uid;
    const studentsRefString = `/${this.userId}/students`;
    this.querySubject.subscribe(opts => {
      console.log('options:', opts);
      this.queryOpts = opts;
      this.students = this.afDB.list(studentsRefString, this.queryOpts);
    })
  }

  ionViewDidLoad() {
    // load all students info
  }

  updateFilter() {
    console.log('activeOnly: ', this.activeOnly);
    if (this.activeOnly) {
      this.querySubject.next({
        query: {
          orderByChild: "status",
          equalTo: "active"
        }
      })
    } else {
      this.querySubject.next({});
    }
  }

  onEdit(student) {
    console.log('Edit student info: ', student);
    let modal = this.modalCtrl.create(StudentModalPage, { confirmTitle: "Update", student });
    modal.present();
  }

  onAdd() {
    // show add modal
    let modal = this.modalCtrl.create(StudentModalPage, {});
    modal.present();
  }
}
