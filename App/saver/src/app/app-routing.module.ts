import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonalComponent} from "./views/personal/personal.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: PersonalComponent },
  // { path: 'current/:id', component: CurrentTaskComponent },
  {path: '404', component: PersonalComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
