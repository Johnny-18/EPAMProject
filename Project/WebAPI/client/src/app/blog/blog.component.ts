import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  userId:string
  userName:string
  blogFromDB:any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let decodedToken = this.userService.getDecodedAccessToken(localStorage.getItem('token'));
    this.userId = decodedToken.nameid;
    this.userName = decodedToken.unique_name;
    console.log(this.userName, this.userId);
  }

}
