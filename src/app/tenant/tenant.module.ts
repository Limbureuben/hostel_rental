import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TenantDashboardComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TenantModule { }
