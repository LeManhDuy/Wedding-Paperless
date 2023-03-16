import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvitationComponent } from './new-invitation.component';

describe('NewInvitationComponent', () => {
  let component: NewInvitationComponent;
  let fixture: ComponentFixture<NewInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
