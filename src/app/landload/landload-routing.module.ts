import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';
import { HouseFormComponent } from './house-form/house-form.component';

const routes: Routes = [
  { path: 'landload-dashboard', component: LandloadDashboardComponent },
  { path: 'house-form', component: HouseFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandloadRoutingModule { }
