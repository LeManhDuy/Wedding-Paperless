import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegisterSongComponent } from './edit-register-song.component';

describe('EditRegisterSongComponent', () => {
  let component: EditRegisterSongComponent;
  let fixture: ComponentFixture<EditRegisterSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRegisterSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRegisterSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
