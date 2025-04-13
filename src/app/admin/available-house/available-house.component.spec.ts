import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableHouseComponent } from './available-house.component';

describe('AvailableHouseComponent', () => {
  let component: AvailableHouseComponent;
  let fixture: ComponentFixture<AvailableHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableHouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
