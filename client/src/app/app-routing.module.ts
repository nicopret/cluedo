import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home/home.page';
import { NewGamePage } from './newgame/newgame.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/newgame',
    pathMatch: 'full'
  },
  { path: 'home', component: HomePage },
  { path: 'newgame', component: NewGamePage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
