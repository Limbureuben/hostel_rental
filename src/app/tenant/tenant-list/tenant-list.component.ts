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

  close(): void {
    this.dialogRef.close();
  }

  bookHouse(houseId: number): void {
    this.dialogRef.close();

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
          this.tenantService.bookRoom(houseId).subscribe({
            next: () => {
              Swal.fire({
                title: "Booked!",
                text: "You have successfully booked the house.",
                icon: "success"
              });

              this.snackBar.open('Booking confirmed! PDF downloading...', 'Close', { duration: 4000 });
            },
            error: () => {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong during booking.",
                icon: "error"
              });
            }
          });
        }
      });
    }, 300);
  }

}
