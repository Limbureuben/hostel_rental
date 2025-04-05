import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharingRoutingModule } from './sharing-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from '@coreui/angular';


@NgModule({
  declarations: [
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    SharingRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    CardModule
  ]
})
export class SharingModule { }
