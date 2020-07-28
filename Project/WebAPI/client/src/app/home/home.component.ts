import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchStr:string
  postsFromBack:any
  posts:Post[]

  constructor(private postService:PostService) { }

  ngOnInit(): void {
  }

  search(){
    this.postService.search(this.searchStr).subscribe(data => this.postsFromBack = data);
    if(!this.postsFromBack){
      this.postsFromBack.forEach(element => {
        let post = new Post();
        let tag;

        post = {
          id: element.id,
          title:element.title,
          text:element.text,
          tagId:element.tag_id,
          blogId:element.blog_id,
          created:element.created
        };

        this.posts.push(post);
      });
    }
  }

}
