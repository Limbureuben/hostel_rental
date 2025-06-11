import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserGuard } from '../guards/user.guard';
import { loginRedirectGuard } from '../guards/no-auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OpenstreetmapComponent } from './openstreetmap/openstreetmap.component';
import { HellopageComponent } from './hellopage/hellopage.component';

const routes: Routes = [
  { path: 'user-home', component: UserHomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [UserGuard] },
  { path: 'reset-password/:uidb64/:token', component: ResetPasswordComponent, canActivate: [UserGuard] },
  { path: 'map', component: MapComponent, canActivate: [UserGuard] },
  { path: 'streetmap', component: OpenstreetmapComponent },
  { path: 'page', component: HellopageComponent }
  // { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharingRoutingModule { }
