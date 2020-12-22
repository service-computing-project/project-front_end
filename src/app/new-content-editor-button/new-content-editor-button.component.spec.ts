import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContentEditorButtonComponent } from './new-content-editor-button.component';

describe('NewContentEditorButtonComponent', () => {
  let component: NewContentEditorButtonComponent;
  let fixture: ComponentFixture<NewContentEditorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContentEditorButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContentEditorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
