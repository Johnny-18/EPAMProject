import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-random-posts',
  templateUrl: './random-posts.component.html',
  styleUrls: ['./random-posts.component.css']
})
export class RandomPostsComponent implements OnInit {

  returnedData:any
  @Input() posts:any
  isEmpty:boolean = true
  isEnable:boolean

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(data => this.posts = data);
    if(this.posts != null)
    {
      this.isEmpty = false;
    }
  }

}
