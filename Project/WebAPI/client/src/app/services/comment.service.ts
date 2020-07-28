import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app-injections-tokens';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class CommentService{
      constructor(private http_: HttpClient, 
                    @Inject(BASE_URL) private baseUrl: string, 
                    private router:Router,
                    private userService:UserService){}

    createComment(model:any){

    }

    deleteComment(id:number){

    }

  }