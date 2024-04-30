import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogApiService } from '../../services/blog-api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-topic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-topic.component.html',
  styleUrl: './add-edit-topic.component.css'
})
export class AddEditTopicComponent {

  topicList$!: Observable<any[]>;
  topicTypesList$!: Observable<any[]>;

  constructor(private service: BlogApiService) {}

  @Input() topic: any; // Input property to pass data into the component
  // Local properties to hold topic details
  topicId: number = 0;
  name: string = "";
  topicTypeId: number = 0;
  description: string = "";

  // Lifecycle hook that runs initialization logic
  ngOnInit(): void  {
    // If an existing topic is passed, populate the form fields
    if (this.topic) {
      this.topicId = this.topic.topicId;
      this.name = this.topic.name;
      this.topicTypeId = this.topic.topicTypeId;
      this.description = this.topic.description;
    }
    // Fetches lists for topics and topic types from the API
    this.topicTypesList$ = this.service.getTopicTypeList();
    this.topicList$ = this.service.getTopicList();
  }

  // Method to add a new topic using the service
  addTopic() {
    var topic = {
      name: this.name,
      topicTypeId: +this.topicTypeId, // Ensures topicTypeId is a number
      description: this.description
    };
    this.service.addTopic(topic).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click(); // Programmatically clicks to close modal
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block"; // Shows success message
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"; // Hides success message after 4 seconds
        }
      }, 4000);
    });
  }

  // Method to update an existing topic using the service
  updateTopic(){
    var topic = {
      topicId: this.topicId,
      name: this.name,
      topicTypeId: +this.topicTypeId,
      description: this.description
    };
    this.service.updateTopic(this.topicId, topic).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click(); // Closes the modal window
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block"; // Displays the update success alert
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"; // Automatically hides the alert after 4 seconds
        }
      }, 4000);
    });
  }
}