import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { PostToCreate } from '../models/postToCreate';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Input() title:string
  @Input() text:string
  tagName:string
  userId:number

  post:PostToCreate

  constructor(private postService:PostService, private userService:UserService, private router:Router) { }

  @Input() isChange:boolean = false

  ngOnInit(): void {
    this.userId = this.userService.getDecodedAccessToken(localStorage.getItem('token')).nameid;
  }

  createPost(){
    
    this.post = {
      title:this.title,
      text:this.text,
      tagName:`#${this.tagName}`,
      userId: this.userId
    };
    console.log('id : ', this.userId);
    this.postService.createPost(this.post).subscribe(data => { this.router.navigate(['blog']); this.post = data; }, err => console.log(err));
    
    console.log(this.post);
  }

  changePost(){
    this.post = {
      title:this.title,
      text:this.text,
      tagName:`#${this.tagName}`,
      userId: this.userId
    };
    
    this.postService.changePost(this.post).subscribe(data => this.post = data, err => console.log(err));
    console.log(this.post);
  }

}
