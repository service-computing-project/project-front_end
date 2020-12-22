import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContentEditorComponent } from './new-content-editor.component';

describe('NewContentEditorComponent', () => {
  let component: NewContentEditorComponent;
  let fixture: ComponentFixture<NewContentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContentEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
