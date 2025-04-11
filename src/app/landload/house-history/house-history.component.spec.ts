import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseHistoryComponent } from './house-history.component';

describe('HouseHistoryComponent', () => {
  let component: HouseHistoryComponent;
  let fixture: ComponentFixture<HouseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
