import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  message: string | undefined; // Itt inicializáljuk undefined értékkel

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getHelloMessage();
  }

  getHelloMessage() {
    this.http.get<any>('http://localhost:5000/api/hello').subscribe(
      response => {
        this.message = response;
      },
      error => {
        console.error('Error occurred:', error);
      }
    );
  }
}

