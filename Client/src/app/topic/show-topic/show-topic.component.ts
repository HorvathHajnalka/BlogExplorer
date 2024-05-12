import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BlogApiService } from '../../services/blog-api.service';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { AddEditTopicComponent } from '../add-edit-topic/add-edit-topic.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


// Decorator that marks a class as an Angular component, providing template and style information.
@Component({
  selector: 'app-show-topic', // The CSS selector that identifies this component in a template
  standalone: true, // Marks this component as standalone, meaning it can be imported without needing to be declared in a module.
  imports: [CommonModule, AddEditTopicComponent, FormsModule], // Imports CommonModule for common directives like ngIf, ngFor, etc.
  templateUrl: './show-topic.component.html', // Location of the component's template file.
  styleUrls: ['./show-topic.component.css'] // Location of the component's private CSS styles.
})
export class ShowTopicComponent implements OnInit{ // The component class that implements the OnInit lifecycle hook.

  userId:any = [];
  // Properties to hold observables for topic list and topic types list
  topicList$!:Observable<any[]>; // Observable to hold the list of topics, fetched from the BlogApiService
  topicTypesList$!:Observable<any[]>; // Observable to hold the list of topic types, if needed in future expansion.
  topicTypesList:any=[]; // Array to hold topic types, currently not populated in ngOnInit.
  searchTerm: string = '';
  selectedTopicType: string = 'all';
  filteredTopicList$: Observable<any[]> | undefined;
  favtopics$!:Observable<any[]>;
  comtopics$!:Observable<any[]>;
  // Map to display data associated with foreign keys. Maps topic type IDs to their string representations.
  topicTypesMap:Map<number, string> = new Map()

  favtopicIds!: any[];
  comtopicIds!: any[];
  isFavChecked: boolean = false;
  isComChecked: boolean = false;

  // Constructor that injects the BlogApiService for fetching data
  constructor(private apiservice:BlogApiService, private userstoreservice: UserStoreService, private authservice: AuthService, private router: Router , @Inject(AppComponent) public appComponent: AppComponent) {}

  ngOnInit(): void {
    //initialize userId
    this.userstoreservice.getUserIdFromStore()
      .subscribe(val=>{
        let userIdFromToken = this.authservice.getUserIdFromToken();
        this.userId = val || userIdFromToken
    })

    //initialize favourite topic's Id array
    this.apiservice.getFavTopicList().pipe(
      switchMap(topics => {
        
        const userFavoriteTopics = topics.filter(topic => topic.userId == this.userId);
        const userFavoriteTopicIds = userFavoriteTopics.map(topic => topic.topicId);
        return of(userFavoriteTopicIds);
      })
    ).subscribe(favtopicIds => {
      this.favtopicIds = favtopicIds;
    });

    //initialize commented topic's Id array
    this.apiservice.getCommentList().pipe(
      switchMap(topics => {
        
        const userCommentedTopics = topics.filter(topic => topic.userId == this.userId);
        const userCommentedTopicIds = userCommentedTopics.map(topic => topic.topicId);
        return of(userCommentedTopicIds);
      })
    ).subscribe(comtopicIds => {
      this.comtopicIds = comtopicIds;
    });

    // On component initialization, fetch the topic list from the BlogApiService and assign it to the topicList$ observable.
    this.topicList$ = this.apiservice.getTopicList();
    this.topicTypesList$ = this.apiservice.getTopicTypeList();
    this.refreshTopicTypesMap();
    this.searchByTopic();
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
       this.apiservice.deleteTopic(item.topicId).subscribe(res => {
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
         this.searchByTopic();
       });
     }
   }
 

   // Closes the modal and refreshes the topic list.
   modalClose() {
     this.activateAddEditTopicComponent = false; // Hide the modal.
     this.topicList$ = this.apiservice.getTopicList(); // Refresh the topic list.
     this.searchByTopic();
   }
 

   // Populates the map of topic types for display.
   refreshTopicTypesMap() {
     this.apiservice.getTopicTypeList().subscribe(data => {
       this.topicTypesList = data; // Store the list of topic types.
       for (let i = 0; i < data.length; i++) {
         this.topicTypesMap.set(this.topicTypesList[i].topicTypeId, this.topicTypesList[i].name); // Map topic type IDs to names.
       }
     });
   }
   

   searchByTopic() {
    if (this.searchTerm.trim() !== '') {
      this.filteredTopicList$ = this.apiservice.getTopicList().pipe(
        switchMap(topics => {
          return of(topics.filter(item => {
            return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          }));
        })
      );
      return;
    }
    if (this.selectedTopicType !== 'all') {
      this.filteredTopicList$ = this.apiservice.getTopicList().pipe(
        switchMap(topics => {
          return of(topics.filter(item => {
            const topicType = this.topicTypesMap.get(item.topicTypeId);
            if (topicType) {
              return topicType.toLowerCase() === this.selectedTopicType.toLowerCase();
            }
            return false;
          }));
        })
      );
      return;
    }
    this.filteredTopicList$ = this.apiservice.getTopicList();
  }
   

	clearSearchTerm(): void {
	  this.searchTerm = ''; // Clear the search term
	  this.selectedTopicType = 'all';
	  this.searchByTopic();
	}

  onFavCheckboxChange(): void {
    this.clearSearchTerm();
    if (this.isFavChecked) {     

      this.isComChecked = false;

      this.apiservice.getTopicList().pipe(
        map(topics => topics.filter(topic => this.favtopicIds.includes(topic.topicId)))
      ).subscribe(filteredTopics => {
        this.filteredTopicList$ = of(filteredTopics);
      });
      
    } else {
      this.filteredTopicList$ = this.apiservice.getTopicList();
    }
  }

  onComCheckboxChange(): void {
    this.clearSearchTerm();
    if (this.isComChecked) {
      
      this.isFavChecked = false;

      this.apiservice.getTopicList().pipe(
        map(topics => topics.filter(topic => this.comtopicIds.includes(topic.topicId)))
      ).subscribe(filteredTopics => {
        this.filteredTopicList$ = of(filteredTopics);
      });
      
    } else {      
      this.filteredTopicList$ = this.apiservice.getTopicList();
    }
  }

   // Method for open the topic in a new page
  viewTopic(topic: any) {
    console.log('Navigating to topic:', topic);
    const url = `/topic/${topic.topicId}`;
    this.router.navigateByUrl(url);
  } 
 }