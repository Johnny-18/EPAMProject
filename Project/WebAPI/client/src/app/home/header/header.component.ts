import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogining:boolean = false;

  constructor(private userService:UserService) { }

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
