import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BlogComponent } from './blog/blog.component';
import { HeaderComponent } from './home/header/header.component';
import { SearchComponent } from './home/search/search.component';
import { UserService } from './user/user.service';
import { environment } from 'src/environments/environment';
import { BASE_URL } from './app-injections-tokens';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    PostComponent,
    HomeComponent,
    BlogComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal'}),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component : HomeComponent},
      { path: 'blog', component : BlogComponent},
      { path: 'login', component : LoginComponent},
      { path: 'register', component : RegisterComponent}
    ])
  ],
  providers: [UserService,{
    provide:BASE_URL,
    useValue:environment.baseUrl
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
