import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-random-posts',
  templateUrl: './random-posts.component.html',
  styleUrls: ['./random-posts.component.css']
})
export class RandomPostsComponent implements OnInit {

  returnedData:any
  posts:Post[]
  isEmpty:boolean = true
  isEnable:boolean

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.returnedData = this.postService.getAll();
    if(this.returnedData != null)
    {
      this.isEmpty = false;
    }
  }

}
