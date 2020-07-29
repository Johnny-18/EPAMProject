import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post:Post
  tag:any
  comments:any
  showText:boolean=false
  isShow:boolean=false
  isShowInput:boolean=false
  isLogining:boolean=false
  @Input() isEnable:boolean = true

  constructor(private postService:PostService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token != null)
    {
      let decoded = this.userService.getDecodedAccessToken(token);
      console.log(decoded);
        if(decoded.role == 'Admin' || decoded.role == 'Moderator'){
          this.isEnable = true;
        }
      this.isLogining = true;
    }

  }

  delete(){
    this.postService.deletePost(this.post.id).subscribe();
    this.router.navigate(['']);
  }

  edit(){
    this.router.navigate(['createPost']);
  }
}
