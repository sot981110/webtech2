import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userNames : String[] = [];
  currentUser : User = {
    _id : "0",
    userName : "",
    password : ""
  };
  currentIsValidated : boolean = false;

  readonly loginUrl = "http://localhost:3000/users/login";
  readonly registerUrl = "http://localhost:3000/users/register";
  readonly newPasswordUrl = "http://localhost:3000/users/newPassword";
  readonly unRegisterUrl = "http://localhost:3000/users/unRegister";

  constructor(private http : HttpClient, private snackBar : MatSnackBar) { }

  tryLogin(user : User){
    this.currentUser = user;
    this.http.post(this.loginUrl, this.currentUser).subscribe((res : {authenticated : boolean}) => {
      this.currentIsValidated = res.authenticated;
      if(this.currentIsValidated){
        var snackBarRef = this.snackBar.open("Sikeresen bejelentkezve", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
      else{
        var snackBarRef = this.snackBar.open("Bejelentkezés sikertelen", "Ok", {duration : 5000});
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

  tryRegister(user : User){
    this.currentUser = user;
    this.http.post(this.registerUrl, this.currentUser).subscribe((res : {registered : boolean}) => {
      if(res.registered){
        var snackBarRef = this.snackBar.open("Sikeresen regisztrálva", "Ok", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
      else{
        var snackBarRef = this.snackBar.open("Regisztráció sikertelen", "Ok", {duration : 5000});
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

  changePassword(password : string){
    var newUser = {
      userName:this.currentUser.userName,
      password:this.currentUser.password,
      newPassword:password
    }
    this.currentUser.password = password;
    this.http.put(this.newPasswordUrl, newUser).subscribe((res : User) => {
      if(res.userName){
        var snackBarRef = this.snackBar.open("Jelszó sikeresen megváltoztatva", "Ok", {duration : 5000});
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

  deleteAccount(user : User){
    var snackBarRef = this.snackBar.open("Biztos vagy ebben?", "Igen", {duration : 5000});
        snackBarRef.onAction().subscribe(() => {
          this.http.delete(this.unRegisterUrl + user.userName).subscribe((res : User) => {
            if(res.userName){
              var snackBarRef = this.snackBar.open("Sikeresen törölve", "Ok", {duration : 5000});
              snackBarRef.onAction().subscribe(() => {
                snackBarRef.dismiss();
              });
            }
          }, (err) => {
            console.log(err);
          }, () => {
            console.log("End");
          });
          this.currentIsValidated = false;
          snackBarRef.dismiss();
        });
  }

  logOut(){
    this.currentIsValidated = false;
  }
}
