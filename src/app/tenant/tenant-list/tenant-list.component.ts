import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../../services/tenant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenant-list',
  standalone: false,
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TenantListComponent>,
    private tenantService: TenantService,
    private snackBar: MatSnackBar
  ) {}


  // bookHouse(houseId: number): void {
  //   this.tenantService.bookRoom(houseId);
  //   this.snackBar.open('Booking confirmed! PDF downloading...', 'Close', { duration: 4000 });
  // }

  bookHouse(houseId: number): void {
    // Close the dialog first
    this.dialogRef.close();

    // Wait for dialog to actually close before showing SweetAlert
    setTimeout(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to book this house.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, book it!"
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the booking service
          this.tenantService.bookRoom(houseId);

          // Show confirmation alert
          Swal.fire({
            title: "Booked!",
            text: "You have successfully booked the house.",
            icon: "success"
          });

          // Snackbar confirmation
          this.snackBar.open('Booking confirmed! PDF downloading...', 'Close', { duration: 4000 });
        }
      });
    }, 300); // Delay to ensure dialog is fully closed (adjust if needed)
  }



}
