import { Component, OnInit } from '@angular/core';
import { UserForRegister } from '../../models/userForRegister';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForRegister:UserForRegister;

  loading: boolean = false;
  submitted: boolean = false;

  registerModel: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Name: ['', [Validators.required, Validators.minLength(2)]],
    Surname: ['', [Validators.required, Validators.minLength(2)]],
    Username: ['', [Validators.required, Validators.minLength(3)]],
    Age:['', [Validators.required, Validators.min(14), Validators.max(199)]],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords }),
  });

  constructor(private userService:UserService, 
              private router: Router, 
              private formBuilder: FormBuilder) 
              { 

              }

  ngOnInit(): void {

  }

  comparePasswords(formBuilder: FormGroup) {
    let confirmPswrdCtrl = formBuilder.get('ConfirmPassword');
    
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (formBuilder.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  onSubmit(){

   this.userForRegister = {
     userName:this.registerModel.value.Username,
     firstName:this.registerModel.value.Name,
     lastName:this.registerModel.value.Surname,
     email:this.registerModel.value.Email,
     password:this.registerModel.value.Passwords.Password,
     age:this.registerModel.value.Age.toString(),
   };

   this.loading = true;

   console.log(this.userForRegister);
   this.userService.registerUser(this.userForRegister).subscribe(
    (data:any) => { this.router.navigateByUrl('/login');console.log(data); },
    error => console.error('There was an error!', error)
    );
  }

}
