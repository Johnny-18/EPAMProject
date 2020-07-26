import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForRegister } from './UserForRegister';
import { UserForLogin } from './UserForLogin';
import { BASE_URL } from '../app-injections-tokens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string, private router:Router) { }
   
  registerUser(model:UserForRegister){
    console.log(model);
    return this.http.post(this.baseUrl + 'api/auth/register', model);
  }
  
  loginUser(model:UserForLogin){
    console.log(model);
    return this.http.post(this.baseUrl + 'api/auth/login', model);
  }

  logout(){
    localStorage.removeItem('authToken');    
    this.router.navigate(['user/login']);
  }
}
