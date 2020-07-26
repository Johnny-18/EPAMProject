import { Component, OnInit, Output } from '@angular/core';
import { UserForLogin } from '../UserForLogin';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForLogin:UserForLogin
  password:string = ''
  email:string = ''

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.loginUser(this.userForLogin).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/blog');
      },
      err => {
        console.log(err);
      }
    );
  }

}
