import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandloadHeaderComponent } from './landload-header.component';

describe('LandloadHeaderComponent', () => {
  let component: LandloadHeaderComponent;
  let fixture: ComponentFixture<LandloadHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandloadHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandloadHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
