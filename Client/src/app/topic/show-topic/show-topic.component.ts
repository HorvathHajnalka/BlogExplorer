import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogApiService } from '../../blog-api.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-show-topic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-topic.component.html',
  styleUrls: ['./show-topic.component.css']
})
export class ShowTopicComponent implements OnInit{

  topicList$!:Observable<any[]>;
  topicTypesList$!:Observable<any[]>;
  topicTypesList:any=[];

  // map to display data associate with foreign keys
  topicTypesMap:Map<number, string> = new Map()

  constructor(private service:BlogApiService) {}

  ngOnInit(): void {
    this.topicList$ = this.service.getTopicList();
      
  }

}
