import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../app-injections-tokens';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostToCreate } from '../models/postToCreate';

@Injectable({
    providedIn: 'root'
  })

export class PostService{

    constructor(private http: HttpClient,
                @Inject(BASE_URL) private baseUrl: string,
                private router:Router) { }

    getById(id:number){
        return this.http.get(`${this.baseUrl}api/posts/id/'${id.toString()}`);
    }

    getAll(){
        return this.http.get(`${this.baseUrl}api/posts`);
    }

    createPost(model:PostToCreate){
        return this.http.post(`${this.baseUrl}api/posts`, JSON.stringify(model),{
            headers: new HttpHeaders({
                "Content-Type": "application/json"
              })
        })
    }

    deletePost(id:number){
        return this.http.delete(`${this.baseUrl}api/posts/id/${id}`);
    }

    changePost(model:any){
        return this.http.put(`${this.baseUrl}api/posts/id/${model.id}`, JSON.stringify(model) ,{
            headers: new HttpHeaders({
                "Content-Type": "application/json"
              })
            });
    }

    search(searchStr:string){
        console.log(searchStr);
        return this.http.get(`${this.baseUrl}api/posts?str=${searchStr}`);
    }

    getComments(id:number){
        return this.http.get(`${this.baseUrl}api/posts/id/${id.toString()}/comments`);
    }

}