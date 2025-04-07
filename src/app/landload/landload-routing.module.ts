import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';

const routes: Routes = [
  { path: 'landload-dashboard', component: LandloadDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandloadRoutingModule { }
