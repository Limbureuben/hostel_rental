import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../../services/tenant.service';

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
    this.tenantService.bookRoom(houseId);
    this.snackBar.open('Booking confirmed! PDF downloading...', 'Close', { duration: 4000 });
  }

}
