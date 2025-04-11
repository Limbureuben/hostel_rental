import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HouseFormComponent } from '../house-form/house-form.component';

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
      width: '600px', // adjust width as needed
      disableClose: true, // optional: disable clicking outside to close
    });
  }

  onViewRoomHistory() {
    // Navigate to room history page
    this.router.navigate(['/room-history']);
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
