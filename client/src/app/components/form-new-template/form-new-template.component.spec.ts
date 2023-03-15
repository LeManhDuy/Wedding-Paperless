import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTemplateComponent } from './form-new-template.component';

describe('FormNewTemplateComponent', () => {
  let component: FormNewTemplateComponent;
  let fixture: ComponentFixture<FormNewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNewTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
