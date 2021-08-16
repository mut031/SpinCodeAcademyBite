import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // username = 'vedran.prpic1@gmail.com';
  // pass = 'lozinka';

  username = 'andrea@gmail.com';
  pass = '123';
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.pass);
    this.username = '';
    this.pass = '';
  }

}
