import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogApiService } from '../../blog-api.service';
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

  constructor(private service:BlogApiService) {}

  @Input() topic:any;
  topicId: number = 0;
  name: string = "";
  topicTypeId: number = 0;
  description: string = "";

  ngOnInit(): void  {
    if (this.topic) {

      this.topicId = this.topic.topicId;
      this.name = this.topic.name
      this.topicTypeId = this.topic.topicTypeId;
      this.description = this.topic.description;
    }
    this.topicTypesList$ = this.service.getTopicTypeList();
    this.topicList$ = this.service.getTopicList();
  }

  addTopic() {
    var topic = {
      name:this.name,
      topicTypeId: +this.topicTypeId,
      description:this.description 
    }
    this.service.addTopic(topic).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  updateTopic(){
    var topic = {
      topicId:this.topicId,
      name:this.name,
      topicTypeId: +this.topicTypeId,
      description:this.description 
    }
    var topicId:number = this.topicId;
    this.service.updateTopic(topicId, topic).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

}
