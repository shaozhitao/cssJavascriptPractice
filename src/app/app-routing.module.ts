import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CssPracticeComponent } from './components/css-practice/css-practice.component';

const routes: Routes = [
  // {
    // path: "css",
    // loadChildren: () => import('./module/css-practice.module').then(m => m.CssPracticeModule)
  // },
  {
    path: "css_test", component: CssPracticeComponent
  },
  {
    path: "", component: CssPracticeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
