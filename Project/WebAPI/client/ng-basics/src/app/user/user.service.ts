import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForRegister } from './UserForRegister';
import { UserForLogin } from './UserForLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  registerUser(model:UserForRegister){
    return this.http.post(this.baseUrl + 'api/auth/register', model);
  }
  
  loginUser(model:UserForLogin){
    return this.http.post(this.baseUrl + 'api/auth/login', model);
  }
}
