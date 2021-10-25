import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoritePetsComponent } from './my-favorite-pets.component';

describe('MyFavoritePetsComponent', () => {
  let component: MyFavoritePetsComponent;
  let fixture: ComponentFixture<MyFavoritePetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFavoritePetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavoritePetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
