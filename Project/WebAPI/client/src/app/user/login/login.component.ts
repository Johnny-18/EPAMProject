import { Component, OnInit, Output } from '@angular/core';
import { UserForLogin } from '../../models/userForLogin';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForLogin:UserForLogin;
  token:string;
  userFromBack:any;
  decodeToken:any;

  loginModel:FormGroup = this.formBuilder.group({
    Email:['', [Validators.required,Validators.email]],
    Password:['', [Validators.required,Validators.minLength(4)]]
  });

  constructor(private userService:UserService, 
              private router: Router,
              private formBuilder: FormBuilder) 
              {

              }

  ngOnInit(): void {
  }

  getDecodedAccessToken(token: string): any {
    try{
      const decode = jwt_decode(token);
      console.log(decode);
      return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  onSubmit(){
    this.userForLogin = {
      email:this.loginModel.value.Email,
      password:this.loginModel.value.Password
    }

    this.userService.loginUser(this.userForLogin).subscribe(
      (res: any) => {
        console.log(res);
        const obj = JSON.stringify(res);
        console.log(obj);
        
        //this.token = res.token;
        console.log('decode: ' , jwt_decode(res.userToken));
        //this.userFromBack = res.user;
        localStorage.setItem('token', res.userToken);
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
      }
    );
    console.log(localStorage.getItem('token'));
  }

}
