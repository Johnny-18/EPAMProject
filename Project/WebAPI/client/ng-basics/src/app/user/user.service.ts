import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForRegister } from './UserForRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  RegisterUser(model:UserForRegister){
    return this.http.post(this.baseUrl + 'api/auth/register', model);
  }
}
