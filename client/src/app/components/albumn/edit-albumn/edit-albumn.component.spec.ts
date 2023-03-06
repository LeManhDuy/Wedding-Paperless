import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlbumnComponent } from './edit-albumn.component';

describe('EditAlbumnComponent', () => {
  let component: EditAlbumnComponent;
  let fixture: ComponentFixture<EditAlbumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAlbumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAlbumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
