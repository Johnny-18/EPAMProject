import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserService } from './services/user.service';
import { environment } from 'src/environments/environment';
import { BASE_URL} from './app-injections-tokens';
import { RandomPostsComponent } from './home/random-posts/random-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostService } from './services/post.service';
import { BlogService } from './services/blog.service';
import { CommentComponent } from './posts/post/comment/comment.component';

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
    SearchComponent,
    RandomPostsComponent,
    CreatePostComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal'}),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'blog', component: BlogComponent},
      { path: 'createPost', component: CreatePostComponent},
      { path: '**', redirectTo: '/'}
    ])
  ],
  providers: [UserService,
              PostService,
              BlogService,
              {
                provide:BASE_URL,
                useValue:environment.baseUrl
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
