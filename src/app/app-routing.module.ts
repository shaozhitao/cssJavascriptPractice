import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CeePracticeComponent} from './components/cee-practice/cee-practice.component';

const routes: Routes = [
  {
    path: 'css_test', component: CeePracticeComponent
  },
  {
    path: '', component: CeePracticeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
