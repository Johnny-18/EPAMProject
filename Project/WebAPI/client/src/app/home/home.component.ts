import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchStr:string
  posts:any

  constructor(private postService:PostService, private router:Router) { }

  ngOnInit(): void {
  }

  search(){
    this.postService.search(this.searchStr).subscribe(data => this.posts = data);
    this.router.navigate(['']);
  }

}
