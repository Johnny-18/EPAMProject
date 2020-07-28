import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  text:string;
  title:string;

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    const post = this.postService.getById(1);
    this.text = post.text;
    this.title = post.title;
  }

  delete(){

  }

  edit(){

  }
}
