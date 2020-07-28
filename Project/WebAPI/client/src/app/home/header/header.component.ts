import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogining:boolean = false;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null)
    {
      this.isLogining = true;
    }
    console.log(this.isLogining);
  }

  logout(){
    this.userService.logout();
    this.isLogining = false;
  }

}
