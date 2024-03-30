import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
