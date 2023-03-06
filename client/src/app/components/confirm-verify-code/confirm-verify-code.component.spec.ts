import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVerifyCodeComponent } from './confirm-verify-code.component';

describe('ConfirmVerifyCodeComponent', () => {
  let component: ConfirmVerifyCodeComponent;
  let fixture: ComponentFixture<ConfirmVerifyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmVerifyCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmVerifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
