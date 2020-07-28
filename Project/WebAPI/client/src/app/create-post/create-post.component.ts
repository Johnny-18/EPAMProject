import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostToCreate } from '../models/postToCreate';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  title:string
  text:string
  tagName:string
  userId:number

  post:any

  constructor(private postService:PostService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  createPost(){
    this.userId = this.userService.getDecodedAccessToken(localStorage.getItem('token')).nameid;
    console.log('user id ', this.userId);
    const post:PostToCreate = {
      title:this.title,
      text:this.text,
      tagName:`#${this.tagName}`,
      userId: this.userId
    };

    console.log('post', post);

    this.postService.createPost(post).subscribe(data => this.post = data, err => { console.log(err)});
    this.router.navigate(['blog']);
    console.log(this.post);
  }

}
