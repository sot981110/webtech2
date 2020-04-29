import { Injectable } from '@angular/core';
import { Student } from './student.model';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  selectedStudent : Student;
  students : Student[];

  readonly listStudentsUrl = 'http://192.168.1.175:3000/students/list';
  readonly newStudentUrl = 'http://192.168.1.175:3000/students/new';
  readonly deleteUrlBase = 'http://192.168.1.175:3000/students/';

  constructor(private http : HttpClient, private snackBar : MatSnackBar) {
    this.updateStudents();
   }

  addStudent(){
    this.http.post(this.newStudentUrl, this.selectedStudent).subscribe((res) => {
      if(res != null){
        var snackBarRef = this.snackBar.open("Adat sikeresen mentve", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
      else{
        var snackBarRef = this.snackBar.open("Adatot nem sikerült menteni.", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
    }, (err) => {
      console.log(err);
    }, () => {
      console.log("End");
    });
  }

  updateStudents(){
    this.http.get<Student[]>(this.listStudentsUrl).subscribe((res : Student[]) => {
      this.students = res;
      var snackBarRef = this.snackBar.open("Adatok sikeresen betöltve", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
    }, (err) => {
      console.log(err);
    }, () => {
      console.log("End");
    });
  }

  getStudents(){
    return this.students;
  }

  getSelectedStudent(){
    return this.selectedStudent;
  }

  updateSelectedStudent(student : Student){
    this.selectedStudent = student;
  }

  deleteStudent(){
    this.http.delete(this.deleteUrlBase + this.selectedStudent._id).subscribe((res) => {
      if(res != null){
        var snackBarRef = this.snackBar.open("Adat sikeresen törölve", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
      else{
        var snackBarRef = this.snackBar.open("Adatot nem sikerült törölni.", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
    }, (err) => {
      console.log(err);
    }, () => {
      console.log("End");
    });
  }
}
