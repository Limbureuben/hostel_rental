import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantOrderComponent } from './tenant-order/tenant-order.component';
import { TenantUploadComponent } from './tenant-upload/tenant-upload.component';

const routes: Routes = [
  { path: 'tenant-dashboard', component: TenantDashboardComponent },
  { path: 'tenant-order', component: TenantOrderComponent },
  { path: 'tenant-upload', component: TenantUploadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
