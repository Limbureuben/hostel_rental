import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharingRoutingModule } from './sharing-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardModule, ButtonModule } from '@coreui/angular';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MapComponent } from './map/map.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { OpenstreetmapComponent } from './openstreetmap/openstreetmap.component';
import { HellopageComponent } from './hellopage/hellopage.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    FooterComponent,
    MapComponent,
    MapDisplayComponent,
    HomepageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OpenstreetmapComponent,
    HellopageComponent
  ],
  imports: [
    CommonModule,
    SharingRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    CardModule,
    ButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),
  ],
  exports: [
    ResetPasswordComponent,
    ForgotPasswordComponent,
    MapComponent
  ]
})
export class SharingModule { }
