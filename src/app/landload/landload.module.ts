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

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HouseHistoryComponent } from './house-history/house-history.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { LandloadProfileComponent } from './landload-profile/landload-profile.component';
import { SharingModule } from '../sharing/sharing.module';



@NgModule({
  declarations: [
    LandloadDashboardComponent,
    LandloadHeaderComponent,
    HouseFormComponent,
    HouseHistoryComponent,
    LandloadProfileComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),
    SharingModule
  ]
})
export class LandloadModule { }
