import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {StudentService} from '../student.service';
import {Student} from '../student.model';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
  providers: [StudentService]
})
export class StudentAddComponent implements OnInit {

  students : Student[];

  constructor(public studentService : StudentService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  onAddStudent(studentForm : NgForm){
    var student : Student = {
      _id : studentForm.value.id,
      name : studentForm.value.name,
      department : studentForm.value.department,
      currentTerm : studentForm.value.current,
      admissionYear : studentForm.value.admission
    }
    if(studentForm.valid && student.currentTerm > 1 && student.currentTerm < 13 && student.admissionYear > 1999 && student.admissionYear < 2021){
      this.studentService.updateSelectedStudent(student);
      this.studentService.addStudent();
      studentForm.resetForm();
    }
    else{
      var snackBarRef = this.snackBar.open("Az adatok nem helyesek", "Ok", {duration : 2000});
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
          });
    }
  }

  onReset(studentForm : NgForm){
    studentForm.resetForm();
    studentForm.value.name = "Valami";
  }
}
