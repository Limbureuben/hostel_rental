import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tenant-dashboard',
  standalone: false,
  templateUrl: './tenant-dashboard.component.html',
  styleUrl: './tenant-dashboard.component.scss'
})
export class TenantDashboardComponent {

  constructor(
    private router: Router
  ) {}

  onUploadRoom() {
    // Navigate to upload room page (create this page separately)
    this.router.navigate(['/upload-room']);
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
