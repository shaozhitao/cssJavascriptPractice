import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CeePracticeComponent} from './components/cee-practice/cee-practice.component';
import {ModelShowComponent} from './components/model-show/model-show.component';

const routes: Routes = [
  {
    path: 'css_test', component: ModelShowComponent // CeePracticeComponent
  },
  {
    path: 'model_show', component: CeePracticeComponent // ModelShowComponent
  },
  {
    path: '', component: ModelShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
