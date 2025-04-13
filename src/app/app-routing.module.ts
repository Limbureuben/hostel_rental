import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './sharing/header/header.component';
import { FooterComponent, SidebarComponent } from '@coreui/angular';
import { TenantHeaderComponent } from './tenant/tenant-header/tenant-header.component';
import { LandloadHeaderComponent } from './landload/landload-header/landload-header.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-home', pathMatch: 'full'},
  {
    path: 'app',
    component: HeaderComponent,
    loadChildren: () =>
      import('./sharing/sharing.module').then((m)=>m.SharingModule)
  },
  {
    path: 'app',
    component: FooterComponent,
    loadChildren: () =>
      import('./sharing/sharing.module').then((m) => m.SharingModule)
  },
  {
    path: 'app',
    component: LandloadHeaderComponent,
    loadChildren: () =>
      import('./landload/landload.module').then((m) =>m.LandloadModule)
  },
  {
    path: 'app',
    component: TenantHeaderComponent,
    loadChildren:()=>
      import('./tenant/tenant.module').then((m) =>m.TenantModule)
  },
  {
    path: 'app',
    component: SidebarComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) =>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
