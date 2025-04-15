import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';
import { HouseFormComponent } from './house-form/house-form.component';
import { HouseHistoryComponent } from './house-history/house-history.component';
import { LandloadProfileComponent } from './landload-profile/landload-profile.component';

const routes: Routes = [
  { path: 'landload-dashboard', component: LandloadDashboardComponent },
  { path: 'house-form', component: HouseFormComponent },
  { path: 'house-history', component: HouseHistoryComponent },
  { path: 'landload-profile', component: LandloadProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandloadRoutingModule { }
