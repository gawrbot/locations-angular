import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListItemComponent } from './place-list-item.component';

describe('PlaceListItemComponent', () => {
  let component: PlaceListItemComponent;
  let fixture: ComponentFixture<PlaceListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
