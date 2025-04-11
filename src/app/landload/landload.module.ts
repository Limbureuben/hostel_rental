import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandloadRoutingModule } from './landload-routing.module';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';
import { LandloadHeaderComponent } from './landload-header/landload-header.component';
import { HouseFormComponent } from './house-form/house-form.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { CardModule, ButtonModule } from '@coreui/angular';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LandloadDashboardComponent,
    LandloadHeaderComponent,
    HouseFormComponent
  ],
  imports: [
    CommonModule,
    LandloadRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    CardModule,
    ButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),
  ]
})
export class LandloadModule { }
