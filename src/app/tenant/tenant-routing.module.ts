import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantOrderComponent } from './tenant-order/tenant-order.component';
import { TenantUploadComponent } from './tenant-upload/tenant-upload.component';
import { UserGuard } from '../guards/user.guard';
import { TenantMapComponent } from './tenant-map/tenant-map.component';

const routes: Routes = [
  { path: 'tenant-dashboard', component: TenantDashboardComponent, canActivate: [UserGuard] },
  { path: 'tenant-order', component: TenantOrderComponent, canActivate: [UserGuard] },
  { path: 'tenant-upload', component: TenantUploadComponent, canActivate: [UserGuard] },
  { path: 'tenant-map', component: TenantMapComponent, canActivate: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
