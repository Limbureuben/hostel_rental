import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantOrderComponent } from './tenant-order.component';

describe('TenantOrderComponent', () => {
  let component: TenantOrderComponent;
  let fixture: ComponentFixture<TenantOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
