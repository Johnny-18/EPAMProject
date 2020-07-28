import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserForRegister } from '../models/userForRegister';
import { UserForLogin } from '../models/userForLogin';
import { BASE_URL } from '../app-injections-tokens';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, 
              @Inject(BASE_URL) private baseUrl: string,
              private router:Router) { }
   
  registerUser(model:UserForRegister){
    const toRegister = JSON.stringify(model);

    console.log(toRegister);
     return this.http.post(`${this.baseUrl}api/auth/register`, toRegister, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
     });
  }
  
  loginUser(model:UserForLogin){
    const toLogin = JSON.stringify(model);

    return this.http.post(`${this.baseUrl}api/auth/login`, toLogin, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  logout(){
    localStorage.removeItem('token');    
    this.router.navigate(['']);
  }

  get(id){
    return this.http.get(`${this.baseUrl}api/users/id/${id.toString()}`);
  }

  getPosts(id){
    return this.http.get(`${this.baseUrl}api/user/id/${id}/posts`);
  }
  
  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
