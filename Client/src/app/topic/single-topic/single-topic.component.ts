import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Az FormsModule importálása
import { BlogApiService } from '../../services/blog-api.service';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-topic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-topic.component.html',
  styleUrl: './single-topic.component.css'
})
export class SingleTopicComponent implements OnInit{
  
  userId:any = [];
  topicId!: number;
  topic: any = {};
  commentList$: Observable<any[]> | undefined   
  newcomment: any;
  isChecked: boolean | undefined; 
  

  constructor(private route: ActivatedRoute, private apiservice: BlogApiService, private userstoreservice: UserStoreService, private authservice: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.topicId = params['id'];           
      
    });       

    this.userstoreservice.getUserIdFromStore()
      .subscribe(val=>{
        let userIdFromToken = this.authservice.getUserIdFromToken();
        this.userId = val || userIdFromToken
    })

    this.apiservice.getFavTopic(this.userId, this.topicId)
  .pipe(
    catchError(error => {
      if (error.status === 404) {
        this.isChecked = false;
        return of(null);
      } else {        
        console.error('unknown error: ', error);
        return EMPTY;
      }
    })
  )
  .subscribe(response => {
    this.isChecked = response !== null;
  });

    this.loadTopic();  
    this.getComments();  
    
  }

  onCheckboxChange(): void {
  
    if (this.isChecked) {

      console.log("The chechbox is checked");

      var data = {
        "userId": this.userId,
        "topicId": this.topicId
      }

      this.apiservice.addFavTopic(data).subscribe(response => {
        this.openSnackBar(`${this.topic.name} successfully added to favourite topics`);
      }, error => {
        this.openSnackBar('Something went wrong: '+ error);
      });
    } else {

      console.log('The chechbox is unchecked');

      this.apiservice.deleteFavTopic(this.userId, this.topicId).subscribe(response => {
        this.openSnackBar(`${this.topic.name} successfully deleted from favourite topics`);
      }, error => {
        this.openSnackBar('Something went wrong: '+ error);
      });
    }
  }

  //this function loads the clicked topic
  loadTopic() {
    this.apiservice.getTopic(this.topicId).subscribe(details => {
      this.topic = details;
    });    
  }

  //this function gets the list of all comments, and filters it to the current topic
  getComments(): void {    
    this.commentList$ = this.apiservice.getCommentList().pipe(
        map(comments => comments.filter(comment => comment.topicId == this.topicId))
    );    
  }

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 2000, // A snackbar megjelenési ideje milliszekundumban
    });
  }
}

