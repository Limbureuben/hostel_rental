import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantUploadComponent } from './tenant-upload.component';

describe('TenantUploadComponent', () => {
  let component: TenantUploadComponent;
  let fixture: ComponentFixture<TenantUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
