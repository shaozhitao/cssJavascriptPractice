import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CssPracticeRoutingModule } from './css-practice-routing.module';
import { CssPracticeComponent } from './css-practice.component';
import { ExampleComponent } from './component/example/example.component';

@NgModule({
  declarations: [CssPracticeComponent, ExampleComponent],
  imports: [
    CommonModule,
    CssPracticeRoutingModule
  ]
})
export class CssPracticeModule { }
