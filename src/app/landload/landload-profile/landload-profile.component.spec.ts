import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandloadProfileComponent } from './landload-profile.component';

describe('LandloadProfileComponent', () => {
  let component: LandloadProfileComponent;
  let fixture: ComponentFixture<LandloadProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandloadProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandloadProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
