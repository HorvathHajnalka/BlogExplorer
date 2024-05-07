import { Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './models/login/login.component';
import { RegistrationComponent } from './models/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { SingleTopicComponent } from './topic/single-topic/single-topic.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [

    // Redirects an path 'localhost:4200' to 'localhost:4200/login', so instead of 'localhost:4200', 'localhost:4200/login' will open
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Defines the routes for components 
    // protecting this route with authguard, so only users logged in can reach this url
    {path:'topics', component:TopicComponent, canActivate:[AuthGuard]},
    {path:'users', component:UserComponent, canActivate: [AdminGuard]},
    {path:'login', component:LoginComponent},
    {path:'registration', component:RegistrationComponent},
    {path: 'topic/:id', component:SingleTopicComponent, canActivate:[AuthGuard]}
]

