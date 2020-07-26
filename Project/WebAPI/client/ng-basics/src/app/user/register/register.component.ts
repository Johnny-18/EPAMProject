import { Component, OnInit } from '@angular/core';
import { UserForRegister } from '../UserForRegister';
import { UserService } from '../user.service';

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
  age:any
  country:string
  city:string

  constructor(private userService:UserService) { }

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
     age:this.age,
     country:this.country,
     city:this.city
   };

   this.userService.registerUser(this.userForRegister).subscribe();
   console.log('end');
  }

}
