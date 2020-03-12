import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HandwritingViewerComponent } from './handwriting-viewer.component';

@NgModule({
  declarations: [
    HandwritingViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HandwritingViewerComponent]
})
export class HandwritingViewerModule { }
