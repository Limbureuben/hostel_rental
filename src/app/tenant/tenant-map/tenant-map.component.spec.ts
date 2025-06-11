import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMapComponent } from './tenant-map.component';

describe('TenantMapComponent', () => {
  let component: TenantMapComponent;
  let fixture: ComponentFixture<TenantMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
