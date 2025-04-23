import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AvailableHouseComponent } from './available-house/available-house.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { adminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'admin',
    component: SidebarComponent, canActivate: [adminGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
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
