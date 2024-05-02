import { Component } from '@angular/core';
import { BlogApiService } from '../../services/blog-api.service';
import { UserStoreService } from '../../services/user-store.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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
  userId!: number;
  //userId! : Observable<string>
  topic: any = {};
  commentList$: Observable<any[]> | undefined 
  isFavourite: boolean = false;
  newcomment: any;
  checkbox = document.getElementById('fav-checkbox') as HTMLElement;
  

  constructor(private route: ActivatedRoute, private apiservice: BlogApiService, private userstoreservice: UserStoreService, private authsetvice: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      //this.userId = this.userstoreservice.getUserIdFromStore();
      this.userstoreservice.getUserIdFromStore().pipe(
        map(userId => parseInt(userId, 10))
      ).subscribe(
        userId => {
          this.userId = userId;
        },
        error => {
          console.error('Hiba történt:', error);
        }
      );
      this.loadTopic();  
      this.getComments();  
    });   
    this.checkFavourite();
    
  }


  loadTopic() {
    this.apiservice.getTopic(this.topicId).subscribe(details => {
      this.topic = details;
    });    
  }

  /*getComments(): void {
    this.commentList$ = this.apiservice.getCommentList()
  }*/

  getComments(): void {
    
    this.commentList$ = this.apiservice.getCommentList().pipe(
        map(comments => comments.filter(comment => comment.topicId == this.topicId))
    );    
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
    console.log(`userId: ${this.userId}`);
  }

  toggleFavourite(): void {
    if (this.checkbox){
      
    }
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

