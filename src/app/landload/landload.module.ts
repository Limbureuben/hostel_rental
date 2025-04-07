import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandloadRoutingModule } from './landload-routing.module';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';


@NgModule({
  declarations: [
    LandloadDashboardComponent
  ],
  imports: [
    CommonModule,
    LandloadRoutingModule
  ]
})
export class LandloadModule { }
