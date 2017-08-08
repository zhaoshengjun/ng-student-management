import { DataService } from './../../share/data-service';
import { Student } from './../../share/data/model';
import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "page-student-modal",
  templateUrl: "student-modal.html"
})
export class StudentModalPage {
  confirmTitle: string = "confirm";
  isArchived: boolean = false;
  student: Student = new Student;
  mode: string = "add";

  constructor(private viewCtrl: ViewController,
    private dbService: DataService,
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    let title = this.navParams.get("confirmTitle");
    if (title) this.confirmTitle = title;

    let student = this.navParams.get("student");
    if (student) {
      this.mode = "edit";
      this.student = student;
    }
    this.isArchived = this.student.status == 'achived';
    console.log('student', this.student);
    console.log('confirm title:', this.confirmTitle);
  }

  clickedAvatar() {
    console.log('needs to change avatar');
    // access the photo lib to change the avatar. 
    // this can be saved to the database.
  }

  onConfirm() {
    // should update/add the student data
    // delete/archive will be performed in the list view instead of this detail view
    // for unarchived student, there's archive option
    // for archived student, there's unarchive option
    if (this.mode = "add") {
      this.dbService.addStudent(this.student);
    } else {
      // this.dbService.updateStudentInfo(this.student.$key, newVal)
    }
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
