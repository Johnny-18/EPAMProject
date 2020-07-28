import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any;
  isEnable:boolean = true
  userId:any

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.getDecodedAccessToken(localStorage.getItem('token')).nameid;
    this.getAll();
  }

  getAll(){

    this.userService.getPosts(this.userId).subscribe(data => this.posts = data);
    console.log(this.posts);
  }

}
