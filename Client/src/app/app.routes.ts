import { Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { UserComponent } from './user/user.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    // Redirects an path 'localhost:4200' to 'localhost:4200/main-page', so instead of 'localhost:4200', 'localhost:4200/main-page' will open
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Defines the routes for components 
    {path:'topics', component:TopicComponent, canActivate:[AuthGuard]},
    {path:'users', component:UserComponent, canActivate:[AuthGuard]},
    // protecting this route with authguard, so only users logged in can reach this url
    {path:'main-page', component:MainPageComponent, canActivate:[AuthGuard]},
    {path:'login', component:LoginComponent},
    {path:'registration', component:RegistrationComponent}
]

