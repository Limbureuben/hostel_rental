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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    UserHomeComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    FooterComponent
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
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),

  ]
})
export class SharingModule { }
