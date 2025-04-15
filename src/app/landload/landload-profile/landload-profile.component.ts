import { Component, Inject } from '@angular/core';
import { LandlordService } from '../../services/landlord.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-landload-profile',
  standalone: false,
  templateUrl: './landload-profile.component.html',
  styleUrl: './landload-profile.component.scss'
})
export class LandloadProfileComponent {
  user: any;

  constructor(
    private userService: LandlordService,
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
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
