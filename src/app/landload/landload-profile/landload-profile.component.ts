import { Component, Inject } from '@angular/core';
import { LandlordService } from '../../services/landlord.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landload-profile',
  standalone: false,
  templateUrl: './landload-profile.component.html',
  styleUrl: './landload-profile.component.scss'
})
export class LandloadProfileComponent {
  user: any;
  houseCount: number = 0;

  constructor(
    private userService: LandlordService,
    private dialogRef: MatDialogRef<LandloadProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
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

  resetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
