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
  studentId: string;
  student: Student = new Student;
  mode: string = "add";

  constructor(private viewCtrl: ViewController,
    private dbService: DataService,
    private navParams: NavParams) {

    let title = this.navParams.get("confirmTitle");
    if (title) this.confirmTitle = title;

    let studentID = this.navParams.get("studentId");
    if (studentID) {
      this.studentId = studentID;
      this.student = this.dbService.getStudentById(this.studentId);
      this.mode = "edit";
    }


    // if student has been archived, the UI should reflect this
    // e.g. a darker color or a ribbon on the title.
    this.isArchived = this.student.status == 'achived';
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
