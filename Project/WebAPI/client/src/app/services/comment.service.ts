import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../app-injections-tokens';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class CommentService{
      constructor(private http: HttpClient, 
                    @Inject(BASE_URL) private baseUrl: string, 
                    private router:Router,
                    private userService:UserService){}

    createComment(model:any){
        return this.http.post(`${this.baseUrl}api/comments`, JSON.stringify(model),{
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            })
           });
    }

    deleteComment(id:string){
        return this.http.delete(`${this.baseUrl}api/comments/id/${id}`);
    }

  }