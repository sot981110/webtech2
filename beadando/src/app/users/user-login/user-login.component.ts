import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import {User} from '../user.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }

  onRegister(userForm : NgForm){
    var user : User = {
      _id : "0",
      userName : userForm.value.name,
      password : userForm.value.password
    }
    if(userForm.valid){
      this.userService.tryRegister(user);
    }
  }

  onLogin(userForm : NgForm){
    var user : User = {
      _id : "0",
      userName : userForm.value.name,
      password : userForm.value.password
    }
    if(userForm.valid){
      this.userService.tryLogin(user);
    }
  }

}
