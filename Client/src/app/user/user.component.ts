import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ShowUserComponent } from './show-user/show-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule, ShowUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
