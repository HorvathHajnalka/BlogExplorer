import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TopicComponent } from './topic/topic.component';
import { ShowTopicComponent } from './topic/show-topic/show-topic.component';

import { BlogApiService } from './blog-api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TopicComponent,
    ShowTopicComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BlogApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
