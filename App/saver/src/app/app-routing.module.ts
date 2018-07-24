import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonalComponent} from "./views/personal/personal.component";
import {MessageComponent} from "./data/service/message/message.component";
import {BusinessComponent} from "./views/business/business.component";
import {BulkAddViewComponent} from "./data/manage/upload/bulkAddView/bulkAddView.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: PersonalComponent },
  // { path: 'current/:id', component: CurrentTaskComponent },
  {path: 'bulkImport', component: BulkAddViewComponent},
  {path: 'console', component: MessageComponent},
  {path: '404', component: PersonalComponent},
  {path: '**', redirectTo: '/404'},
  {path: 'offline', component: MessageComponent},
  {path: 'unavailable', component: BusinessComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // listener for browser url changes
  exports: [ RouterModule ] // router directives available for appModule components
})
export class AppRoutingModule { }
