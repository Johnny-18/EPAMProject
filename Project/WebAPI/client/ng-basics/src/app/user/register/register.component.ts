import { Component, OnInit } from '@angular/core';
import { UserForRegister } from '../UserForRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForRegister:UserForRegister
  firstName:string
  lastName:string
  userName:string
  email:string
  password:string
  confPassword:string
  gender:string
  dateOfBirth:any
  country:string
  city:string

  constructor() { }

  ngOnInit(): void {
  }

  register(){
  //register service
   this.userForRegister = {
     userName:this.userName,
     firstName:this.firstName,
     lastName:this.lastName,
     email:this.email,
     password:this.password,
     gender:this.gender,
     dateOfBirth:this.dateOfBirth,
     country:this.country,
     city:this.city
   };
   console.log(this.userForRegister);
  }

}