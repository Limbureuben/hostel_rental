import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AvailableHouseComponent } from './available-house/available-house.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'admin',
    component: SidebarComponent,
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'available-house', component: AvailableHouseComponent },
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
