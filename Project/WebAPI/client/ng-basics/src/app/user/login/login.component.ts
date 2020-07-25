import { Component, OnInit, Output } from '@angular/core';
import { UserForLogin } from '../UserForLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForLogin:UserForLogin
  password:string = ''
  email:string = ''

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.email + ' ' + this.password);
    //login service

  }

  inputHandlerEmail(){
    console.log(this.email);
  }

  inputHandlerPassword(){
    console.log(this.password);
  }

}
