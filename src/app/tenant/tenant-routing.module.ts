import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantOrderComponent } from './tenant-order/tenant-order.component';

const routes: Routes = [
  { path: 'tenant-dashboard', component: TenantDashboardComponent },
  { path: 'tenant-order', component: TenantOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
