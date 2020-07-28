import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    //this.posts = JSON.parse(this.postService.getAll());
    console.log(this.posts);
  }

}
