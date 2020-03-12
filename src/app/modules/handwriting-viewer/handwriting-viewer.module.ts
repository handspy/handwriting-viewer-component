import {NgModule} from '@angular/core';

import {HandwritingViewerComponent} from './handwriting-viewer.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HandwritingViewerComponent
  ],
  providers: [
    HandwritingViewerComponent
  ]
})
export class HandwritingViewerModule {
}
