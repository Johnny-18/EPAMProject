import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL} from '../app-injections-tokens';
import { UserService } from './user.service';
import { decode } from 'querystring';

@Injectable({
    providedIn: 'root'
  })

export class BlogService{
    
    constructor(private http_: HttpClient, 
                @Inject(BASE_URL) private baseUrl: string, 
                private router:Router,
                private userService:UserService) { }

    createBlog(userId:number, blogName:string):any{
        console.log(`${this.baseUrl}api/blogs`);

        return this.http_.post(`${this.baseUrl}api/blogs`, JSON.stringify({id : userId, name: blogName}), {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              })
        });
    }

    getById(id:number){
        console.log('id' , id);

        return this.http_.get(`${this.baseUrl}api/blogs/id/` + id.toString());
    }

}