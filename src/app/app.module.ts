import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CeePracticeComponent } from './components/cee-practice/cee-practice.component';
import { ModelShowComponent } from './components/model-show/model-show.component';

@NgModule({
  declarations: [
    AppComponent,
    CeePracticeComponent,
    ModelShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
