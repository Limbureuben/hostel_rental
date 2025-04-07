import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AdminModule } from './admin/admin.module';
import { LandloadModule } from './landload/landload.module';
import { SharingModule } from './sharing/sharing.module';
import { TenantModule } from './tenant/tenant.module';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from '@coreui/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    LandloadModule,
    SharingModule,
    TenantModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    GraphQLModule,
    MatToolbarModule,
    MatCardModule,
    ButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
