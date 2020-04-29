import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {Student} from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(public studentService : StudentService) {
   }

  ngOnInit(): void {
  }

  onUpdate(){
    this.studentService.updateStudents();
  }

  deleteStudent(student : Student){
    this.studentService.updateSelectedStudent(student);
    this.studentService.deleteStudent();
  }

}
