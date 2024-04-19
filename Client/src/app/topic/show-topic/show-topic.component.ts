import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BlogApiService } from '../../blog-api.service';
import { CommonModule } from '@angular/common'; 
import { AddEditTopicComponent } from '../add-edit-topic/add-edit-topic.component';
import { FormsModule } from '@angular/forms';

// Decorator that marks a class as an Angular component, providing template and style information.
@Component({
  selector: 'app-show-topic', // The CSS selector that identifies this component in a template
  standalone: true, // Marks this component as standalone, meaning it can be imported without needing to be declared in a module.
  imports: [CommonModule, AddEditTopicComponent, FormsModule], // Imports CommonModule for common directives like ngIf, ngFor, etc.
  templateUrl: './show-topic.component.html', // Location of the component's template file.
  styleUrls: ['./show-topic.component.css'] // Location of the component's private CSS styles.
})
export class ShowTopicComponent implements OnInit{ // The component class that implements the OnInit lifecycle hook.

  // Properties to hold observables for topic list and topic types list
  topicList$!:Observable<any[]>; // Observable to hold the list of topics, fetched from the BlogApiService
  topicTypesList$!:Observable<any[]>; // Observable to hold the list of topic types, if needed in future expansion.
  topicTypesList:any=[]; // Array to hold topic types, currently not populated in ngOnInit.
  searchTerm: string = '';
  filteredTopicList$: Observable<any[]> | undefined;
  // Map to display data associated with foreign keys. Maps topic type IDs to their string representations.
  topicTypesMap:Map<number, string> = new Map()

  // Constructor that injects the BlogApiService for fetching data
  constructor(private service:BlogApiService) {}

  ngOnInit(): void {
    // On component initialization, fetch the topic list from the BlogApiService and assign it to the topicList$ observable.
    this.topicList$ = this.service.getTopicList();
    this.topicTypesList$ = this.service.getTopicTypeList();
    this.refreshTopicTypesMap();
    this.searchByTopicType();
  }

   // Component properties related to UI state.
   modalTitle: string = ''; // Title for the modal dialog.
   activateAddEditTopicComponent: boolean = false; // Controls visibility of the add/edit modal.
   topic: any; // The current topic to add/edit.
 
   
   // Opens the modal to add a new topic.
   modalAdd() {
     this.topic = {
       topicId: 0,
       name: null,
       topicTypeId: 0,
       description: null
     };
     this.modalTitle = "Add New Topic"; // Set modal title.
     this.activateAddEditTopicComponent = true; // Show the modal component.
   }
 
   // Opens the modal to edit an existing topic.
   modalEdit(item: any) {
     this.topic = item; // Set the current topic to the item to be edited.
     this.modalTitle = "Edit Topic"; // Set modal title.
     this.activateAddEditTopicComponent = true; // Show the modal component.
   }
 

   // Deletes a topic after confirmation.
   delete(item: any) {
     if (confirm(`Are you sure you want to delete topic: "${item.name}" ?`)) {
       this.service.deleteTopic(item.topicId).subscribe(res => {
         var closeModalBtn = document.getElementById('add-edit-modal-close');
         if (closeModalBtn) {
           closeModalBtn.click(); // Programmatically close the modal.
         }
         var showDeleteSuccess = document.getElementById('delete-success-alert');
         if (showDeleteSuccess) {
           showDeleteSuccess.style.display = "block"; // Show success message.
         }
         setTimeout(function() {
           if (showDeleteSuccess) {
             showDeleteSuccess.style.display = "none"; // Hide success message after 4 seconds.
           }
         }, 4000);
         this.searchByTopicType();
       });
     }
   }
 

   // Closes the modal and refreshes the topic list.
   modalClose() {
     this.activateAddEditTopicComponent = false; // Hide the modal.
     this.topicList$ = this.service.getTopicList(); // Refresh the topic list.
     this.searchByTopicType();
   }
 

   // Populates the map of topic types for display.
   refreshTopicTypesMap() {
     this.service.getTopicTypeList().subscribe(data => {
       this.topicTypesList = data; // Store the list of topic types.
       for (let i = 0; i < data.length; i++) {
         this.topicTypesMap.set(this.topicTypesList[i].topicTypeId, this.topicTypesList[i].name); // Map topic type IDs to names.
       }
     });
   }

searchByTopicType() {
  if (this.searchTerm.trim() === '') {
    this.filteredTopicList$ = this.service.getTopicList();
    return;
  }

  this.filteredTopicList$ = this.service.getTopicList().pipe(
    switchMap(topics => {
      return of(topics.filter(item => {
        const topicType = this.topicTypesMap.get(item.topicTypeId);
        if (topicType) {
          return topicType.toLowerCase().startsWith(this.searchTerm.toLowerCase());
        }
        return false;
      }));
    })
  );
}

clearSearchTerm(): void {
  this.searchTerm = ''; // Clear the search term
  this.searchByTopicType();
}

  

  
  
 }