import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandloadDashboardComponent } from './landload-dashboard.component';

describe('LandloadDashboardComponent', () => {
  let component: LandloadDashboardComponent;
  let fixture: ComponentFixture<LandloadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandloadDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandloadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
