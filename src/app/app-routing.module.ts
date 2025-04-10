import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './sharing/header/header.component';
import { FooterComponent } from '@coreui/angular';
import { TenantHeaderComponent } from './tenant/tenant-header/tenant-header.component';

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
    component: TenantHeaderComponent,
    loadChildren: () =>
      import('./sharing/sharing.module').then((m) =>m.SharingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
