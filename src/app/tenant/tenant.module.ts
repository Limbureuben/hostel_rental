import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TenantHeaderComponent } from './tenant-header/tenant-header.component';
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
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TenantOrderComponent } from './tenant-order/tenant-order.component';
import { TenantProfileComponent } from './tenant-profile/tenant-profile.component';



@NgModule({
  declarations: [
    TenantDashboardComponent,
    TenantHeaderComponent,
    TenantListComponent,
    TenantOrderComponent,
    TenantProfileComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
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
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),

  ]
})
export class TenantModule { }
