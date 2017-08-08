import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { StudentModalPage } from "./../student-modal/student-modal";
import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "page-setting",
  templateUrl: "setting.html"
})
export class SettingPage {
  userId: string;
  students;
  activeOnly: Subject<any>;


  constructor(
    public navCtrl: NavController,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
    this.activeOnly = new Subject();
    this.userId = this.afAuth.auth.currentUser.uid;
    const studentsRefString = `/${this.userId}/students`
    this.students = this.afDB.list(studentsRefString);
  }

  ionViewDidLoad() {
    // load all students info

  }

  updateFilter() {
    this.activeOnly.next()
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
