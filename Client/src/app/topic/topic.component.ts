import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { ShowTopicComponent } from './show-topic/show-topic.component';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [HttpClientModule, ShowTopicComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

}
