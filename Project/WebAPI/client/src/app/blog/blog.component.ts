import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  blogName:string = "Blog name"
  userFromDB:any
  isBlogCreated:boolean = true
  blogFromDB:any

  constructor(private blogService: BlogService, private userService: UserService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token == null)
    {
      this.isBlogCreated = false;
    }
    else{
      let nameid = this.userService.getDecodedAccessToken(token).nameid;
      this.userService.get(nameid).subscribe(data => {this.userFromDB = data; console.log('data' , data);});
      console.log('userfromdb:' , this.userFromDB);
    }
  }

  createBlog(){
    this.blogService.createBlog(this.userFromDB.id, this.userFromDB.username)
                    .subscribe(data => this.blogFromDB = data, 
                              err => console.log("Don't create" + JSON.stringify(err)));
  }
}
