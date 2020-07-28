import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post:Post
  showText:boolean
  @Input() isEnable:boolean = true

  constructor(private postService:PostService, private userService:UserService) { }

  ngOnInit(): void {

  }

  delete(){

  }

  edit(){

  }
}
