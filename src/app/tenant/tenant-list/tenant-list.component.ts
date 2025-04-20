import { Component, Inject } from '@angular/core';
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
    private tenantService: TenantService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  bookHouse(houseId: number): void {
    this.tenantService.bookRoom(houseId);
  }

}
