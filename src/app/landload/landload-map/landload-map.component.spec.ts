import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandloadMapComponent } from './landload-map.component';

describe('LandloadMapComponent', () => {
  let component: LandloadMapComponent;
  let fixture: ComponentFixture<LandloadMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandloadMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandloadMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
