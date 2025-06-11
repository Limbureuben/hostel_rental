import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TenantProfileComponent } from '../tenant-profile/tenant-profile.component';
import { TenantUploadComponent } from '../tenant-upload/tenant-upload.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tenant-header',
  standalone: false,
  templateUrl: './tenant-header.component.html',
  styleUrl: './tenant-header.component.scss'
})
export class TenantHeaderComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  NavigateToTenant() {
    this.router.navigate(['/tenant-dashboard']);
  }

  ViewTheProfile(): void {
        this.dialog.open(TenantProfileComponent, {
          width: '400px',
          disableClose: false,
        });
     }

     NavigateToUpload(): void {
        this.dialog.open(TenantUploadComponent, {
          width: '500px',
          maxHeight: '90vh',
          disableClose: false,
        });
     }

     Logout() {
      localStorage.clear()
      this.router.navigate(['/page']);
      this.toastr.success('Logout success');
     }

}
