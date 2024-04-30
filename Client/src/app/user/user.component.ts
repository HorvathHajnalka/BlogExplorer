import { Component, Inject } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ShowUserComponent } from './show-user/show-user.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule, ShowUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private http: HttpClient, @Inject(AppComponent) public appComponent: AppComponent) {

  }
  
  ngOnInit(): void{
    
  }
}
