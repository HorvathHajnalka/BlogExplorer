import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowTopicComponent } from './topic/show-topic/show-topic.component';
import { HttpClientModule } from '@angular/common/http'; 




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShowTopicComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular17-blogexplorer-api';
}
