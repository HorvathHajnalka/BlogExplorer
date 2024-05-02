import { Component } from '@angular/core';
import { BlogApiService } from '../../services/blog-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-topic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-topic.component.html',
  styleUrl: './single-topic.component.css'
})
export class SingleTopicComponent {
  topicId!: number;
  topic: any = {};
  commentList$: Observable<any[]> | undefined 

  constructor(private route: ActivatedRoute, private service: BlogApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      this.loadTopic();  
      this.getComments();    
    });        
  }

  modalTitle: string = ''; // Title for the modal dialog.
  writecommentComponent: boolean = false; // Controls visibility of the add/edit modal.
  newcomment: any; // The current topic to add/edit.

  
  // Opens the modal to add a new topic.
  modalWrite() {
    this.newcomment = {
      commentId: 0,
      userId: 0,
      user: null,
      topicId: 0,
      topic: null,      
      body: "",
      timestamp: ""
    };
    this.modalTitle = "Write a new comment"; // Set modal title.
    this.writecommentComponent = true; // Show the modal component.
  }

  loadTopic() {
    this.service.getTopic(this.topicId).subscribe(details => {
      this.topic = details;
    });
  }

  getComments(): void {
    this.commentList$ = this.service.getCommentList()
  }

  //getComments(): void {
  //  this.service.getCommentList().subscribe(
  //    (data: any[]) => {
  //      console.log('Comments:', data);
  //      this.commentList$ = of(data.filter(comment => comment.topicId === this.topicId));
  //    },
  //    error => {
  //      console.error('Error fetching comments:', error);
  //    }
  //  );
  //}
}

