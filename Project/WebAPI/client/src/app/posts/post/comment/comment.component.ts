import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentsFromBack:any

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getComments(1).subscribe();
  }

}
