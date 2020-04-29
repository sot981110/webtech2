import { Component } from '@angular/core';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent{
  constructor(public userService : UserService) {

  }

  ngOnInit(): void {
  }
}
