import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShowUserComponent } from './show-user/show-user.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule, ShowUserComponent],
  providers:[{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true}],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
