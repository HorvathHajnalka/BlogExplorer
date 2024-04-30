import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogApiService } from '../../services/blog-api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent {

  userList$!: Observable<any[]>;
  constructor(private service: BlogApiService, private auth: AuthService) {}
  
  @Input() user: any; // Input property to pass data into the component
  // Local properties to hold user details
  userId: number = 0;
  username: string = "";
  name: number = 0;
  password: string = "";

  // Lifecycle hook that runs initialization logic
  ngOnInit(): void  {
    // If an existing user is passed, populate the form fields
    if (this.user) {
      this.userId = this.user.userId;
      this.username = this.user.username;
      this.name = this.user.name;
      this.password = this.user.password;
    }
    // Fetches lists for users from the API
    this.userList$ = this.service.getUserList();
  }

  // Method to add a new user using the service
  addUser() {
    var user = {
      username: this.username,
      name: this.name,
      password: this.password
    };
    this.auth.signUp(user).subscribe(res => {
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

  // Method to update an existing user using the service
  updateUser(){
    var user = {
      userId: this.userId,
      username: this.username,
      name: this.name,
      password: this.password
    };
    this.service.updateUser(this.userId, user).subscribe(res => {
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