import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogApiService } from '../../blog-api.service';
import { CommonModule } from '@angular/common'; 
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

// Decorator that marks a class as an Angular component, providing template and style information.
@Component({
  selector: 'app-show-user', // The CSS selector that identifies this component in a template
  standalone: true, // Marks this component as standalone, meaning it can be imported without needing to be declared in a module.
  imports: [CommonModule, AddEditUserComponent], // Imports CommonModule for common directives like ngIf, ngFor, etc.
  templateUrl: './show-user.component.html', // Location of the component's template file.
  styleUrls: ['./show-user.component.css'] // Location of the component's private CSS styles.
})
export class ShowUserComponent implements OnInit{ // The component class that implements the OnInit lifecycle hook.

  // Properties to hold observables for users list
  userList$!:Observable<any[]>; // Observable to hold the list of users, fetched from the BlogApiService

  // Constructor that injects the BlogApiService for fetching data
  constructor(private service:BlogApiService) {}

  ngOnInit(): void {
    // On component initialization, fetch the user list from the BlogApiService and assign it to the userList$ observable.
    this.userList$ = this.service.getUserList();
  }

   // Component properties related to UI state.
   modalTitle: string = ''; // Title for the modal dialog.
   activateAddEditUserComponent: boolean = false; // Controls visibility of the add/edit modal.
   user: any; // The current user to add/edit.
 
   
   // Opens the modal to add a new user.
   modalAdd() {
     this.user = {
       userId: 0,
       username: null,
       name: null,
       password: null
     };
     this.modalTitle = "Add New User"; // Set modal title.
     this.activateAddEditUserComponent = true; // Show the modal component.
   }
 
   // Opens the modal to edit an existing user.
   modalEdit(item: any) {
     this.user = item; // Set the current user to the item to be edited.
     this.modalTitle = "Edit User"; // Set modal title.
     this.activateAddEditUserComponent = true; // Show the modal component.
   }
 

   // Deletes a user after confirmation.
   delete(item: any) {
     if (confirm(`Are you sure you want to delete user: "${item.username}" ?`)) {
       this.service.deleteUser(item.userId).subscribe(res => {
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
         this.userList$ = this.service.getUserList(); // Refresh the user list.
       });
     }
   }
 

   // Closes the modal and refreshes the user list.
   modalClose() {
     this.activateAddEditUserComponent = false; // Hide the modal.
     this.userList$ = this.service.getUserList(); // Refresh the user list.
   }
 }