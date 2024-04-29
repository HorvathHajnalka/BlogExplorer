import { Component } from '@angular/core';
import { BlogApiService } from '../../blog-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-topic',
  standalone: true,
  imports: [],
  templateUrl: './single-topic.component.html',
  styleUrl: './single-topic.component.css'
})
export class SingleTopicComponent {
  topicId!: number;
  topicDetails: any;

  constructor(private route: ActivatedRoute, private apiService: BlogApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      this.loadTopicDetails();
    });
  }

  loadTopicDetails() {
    this.apiService.getTopic(this.topicId).subscribe(details => {
      this.topicDetails = details;
    });
  }
}

