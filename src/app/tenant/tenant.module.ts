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
import { TenantUploadComponent } from './tenant-upload/tenant-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TenantMapComponent } from './tenant-map/tenant-map.component';
import { SafePipe } from '../pipes/safe.pipe'




@NgModule({
  declarations: [
    TenantDashboardComponent,
    TenantHeaderComponent,
    TenantListComponent,
    TenantOrderComponent,
    TenantProfileComponent,
    TenantUploadComponent,
    TenantMapComponent,
    SafePipe
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
    MatProgressBarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),
  ],
  exports: [
    SafePipe
  ]
})
export class TenantModule { }
