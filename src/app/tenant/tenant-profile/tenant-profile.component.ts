import { Component, Inject } from '@angular/core';
import { LandlordService } from '../../services/landlord.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tenant-profile',
  standalone: false,
  templateUrl: './tenant-profile.component.html',
  styleUrl: './tenant-profile.component.scss'
})
export class TenantProfileComponent {
  user: any;
    houseCount: number = 0;

    constructor(
      private userService: LandlordService,
      private dialogRef: MatDialogRef<TenantProfileComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
      this.userService.getProfile().subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Profile fetch error:', err);
        }
      });

      this.userService.getMyHouse().subscribe({
        next: (houses) => {
          this.houseCount = houses.length;
        },
        error: (err) => {
          console.error('House fetch error:', err);
        }
      });
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
