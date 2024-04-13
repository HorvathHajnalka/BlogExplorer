import { Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { UserComponent } from './user/user.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [

    // Redirects an path 'localhost:4200' to 'localhost:4200/main-page', so instead of 'localhost:4200', 'localhost:4200/main-page' will open
    { path: '', redirectTo: '/main-page', pathMatch: 'full' },

    // Defines the routes for components 
    {path:'topics', component:TopicComponent},
    {path:'users', component:UserComponent},
    {path:'main-page', component:MainPageComponent}
]

