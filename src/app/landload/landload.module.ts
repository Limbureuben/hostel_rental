import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandloadRoutingModule } from './landload-routing.module';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';
import { LandloadHeaderComponent } from './landload-header/landload-header.component';
import { HouseFormComponent } from './house-form/house-form.component';


@NgModule({
  declarations: [
    LandloadDashboardComponent,
    LandloadHeaderComponent,
    HouseFormComponent
  ],
  imports: [
    CommonModule,
    LandloadRoutingModule
  ]
})
export class LandloadModule { }
