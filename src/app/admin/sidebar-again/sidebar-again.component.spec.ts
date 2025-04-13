import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAgainComponent } from './sidebar-again.component';

describe('SidebarAgainComponent', () => {
  let component: SidebarAgainComponent;
  let fixture: ComponentFixture<SidebarAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarAgainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
