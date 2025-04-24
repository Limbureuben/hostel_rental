import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HouseFormComponent } from '../house-form/house-form.component';
import { HouseHistoryComponent } from '../house-history/house-history.component';
import { ToastrService } from 'ngx-toastr';
import { AgreementHistoryComponent } from '../agreement-history/agreement-history.component';

@Component({
  selector: 'app-landload-dashboard',
  standalone: false,
  templateUrl: './landload-dashboard.component.html',
  styleUrl: './landload-dashboard.component.scss'
})
export class LandloadDashboardComponent {


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  onUploadRoom() {
    this.dialog.open(HouseFormComponent, {
      width: '900px', // 90% of the viewport width
      maxWidth: 'none', // allow it to go wider than default max (default is 80vw)
      panelClass: 'custom-dialog-container', // for additional styling
      disableClose: true,
      // Removed invalid properties
    });
  }


  onViewRoomHistory() {
    this.dialog.open(HouseHistoryComponent, {
      width: '1200px',
      height: '513px',
      disableClose: true,
    });
  }

  onViewServices() {
    // Navigate to view services page
    this.router.navigate(['/view-services']);
  }

  onManageBooking(): void {
    this.dialog.open(AgreementHistoryComponent, {
          width: '1200px',
          height: '500px',
          disableClose: false
        });
     }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/login']);
    this.toastr.success('Logout success', 'Success');
  }
}
