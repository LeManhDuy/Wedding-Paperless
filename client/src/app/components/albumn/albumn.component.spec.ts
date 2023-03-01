import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumnComponent } from './albumn.component';

describe('AlbumnComponent', () => {
  let component: AlbumnComponent;
  let fixture: ComponentFixture<AlbumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
