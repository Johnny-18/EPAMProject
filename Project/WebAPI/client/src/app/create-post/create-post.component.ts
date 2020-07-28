import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostToCreate } from '../models/postToCreate';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  title:string
  text:string
  tagName:string
  blogId:string

  post:any

  constructor(private postService:PostService, private userService:UserService) { }

  ngOnInit(): void {
  }

  createPost(){
    this.blogId = this.userService.getDecodedAccessToken(localStorage.getItem('token')).nameid;
    console.log(this.blogId);
    const post:PostToCreate = {
      title:this.title,
      text:this.text,
      tagName:`#${this.tagName}`,
      blogId: 1
    };

    const res = this.postService.createPost(post).subscribe(data => this.post = data);
    console.log(this.post);
  }

}
