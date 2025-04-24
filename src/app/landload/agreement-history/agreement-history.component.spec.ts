import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementHistoryComponent } from './agreement-history.component';

describe('AgreementHistoryComponent', () => {
  let component: AgreementHistoryComponent;
  let fixture: ComponentFixture<AgreementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgreementHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
