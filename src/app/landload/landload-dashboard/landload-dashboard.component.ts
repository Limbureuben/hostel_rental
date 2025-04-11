import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HouseFormComponent } from '../house-form/house-form.component';
import { HouseHistoryComponent } from '../house-history/house-history.component';

@Component({
  selector: 'app-landload-dashboard',
  standalone: false,
  templateUrl: './landload-dashboard.component.html',
  styleUrl: './landload-dashboard.component.scss'
})
export class LandloadDashboardComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
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
      height: '500px',
      disableClose: false
    });
  }

  onViewServices() {
    // Navigate to view services page
    this.router.navigate(['/view-services']);
  }

  onManagePayments() {
    // Navigate to manage payments page
    this.router.navigate(['/manage-payments']);
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

}
