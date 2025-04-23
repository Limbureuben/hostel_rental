import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandloadDashboardComponent } from './landload-dashboard/landload-dashboard.component';
import { HouseFormComponent } from './house-form/house-form.component';
import { HouseHistoryComponent } from './house-history/house-history.component';
import { LandloadProfileComponent } from './landload-profile/landload-profile.component';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  { path: 'landload-dashboard', component: LandloadDashboardComponent, canActivate: [UserGuard] },
  { path: 'house-form', component: HouseFormComponent, canActivate: [UserGuard] },
  { path: 'house-history', component: HouseHistoryComponent, canActivate: [UserGuard] },
  { path: 'landload-profile', component: LandloadProfileComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandloadRoutingModule { }
