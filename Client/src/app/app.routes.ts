import { Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { UserComponent } from './user/user.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    {path:'topics', component:TopicComponent},
    {path:'users', component:UserComponent},
    {path:'main-page', component:MainPageComponent}
]

