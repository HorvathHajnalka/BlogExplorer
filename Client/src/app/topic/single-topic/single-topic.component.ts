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
  isFavourite: boolean = false;

  constructor(private route: ActivatedRoute, private service: BlogApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      this.loadTopic();  
      this.getComments();
      this.checkFavourite();    
    });        
  }

  modalTitle: string = ''; // Title for the modal dialog.
  writecommentComponent: boolean = false; // Controls visibility of the add/edit modal.
  newcomment: any; // The current topic to add/edit.

  checkbox = document.getElementById('fav-checkbox') as HTMLInputElement;


  
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

  checkFavourite(): void {
    // Implementálj egy hívást, hogy ellenőrizd, hogy a jelenlegi téma kedvenc-e
    // Ehhez használhatsz egy olyan függvényt, ami az API segítségével lekéri a felhasználó kedvenc témáit
    // A példakód ezt a függvényt toggleFavorite() néven implementálja
  }

  toggleFavourite(): void {
    // Implementálj egy hívást, ami frissíti az adatbázist attól függően, hogy a téma kedvenc-e vagy sem
    // Ehhez használhatsz egy olyan függvényt, ami az API segítségével beállítja vagy törli a kedvenc témát
    // Példaként a checkFavorite() függvényt használjuk, hogy beállítsuk vagy töröljük a kedvenc témát

    /*

    //ez így nem jó, de tudnom kell hozzá, hogy működik az API
    this.service.setFavoriteTopic(this.topicId, !this.isFavourite).subscribe(() => {
      this.isFavourite = !this.isFavourite;
    });*/
  }
}

