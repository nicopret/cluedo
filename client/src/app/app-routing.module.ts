import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home/home.page';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: 'home', component: HomePage },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
