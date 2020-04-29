import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }

  changePassword(userForm : NgForm){
    if(userForm.valid && userForm.value.newPassword1 == userForm.value.newPassword2){
      this.userService.changePassword(userForm.value.newPassword1);
    }
  }

  deleteAccount(){
    this.deleteAccount();
  }

}
