import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandwritingViewerComponent } from './handwriting-viewer.component';

describe('HandwritingViewerComponent', () => {
  let component: HandwritingViewerComponent;
  let fixture: ComponentFixture<HandwritingViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandwritingViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandwritingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
