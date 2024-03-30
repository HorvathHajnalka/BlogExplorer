import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

}
