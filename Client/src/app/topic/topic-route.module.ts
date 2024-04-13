import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { TopicComponent } from './topic.component';

export const routes: Routes = [
    {path:'topics', component:TopicComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TopicRouteModule{}