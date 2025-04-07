import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';


@NgModule({
  declarations: [
    TenantDashboardComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule
  ]
})
export class TenantModule { }
