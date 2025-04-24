import { Component } from '@angular/core';
import { HouseFormComponent } from '../house-form/house-form.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HouseHistoryComponent } from '../house-history/house-history.component';
import { LandloadProfileComponent } from '../landload-profile/landload-profile.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-landload-header',
  standalone: false,
  templateUrl: './landload-header.component.html',
  styleUrl: './landload-header.component.scss'
})
export class LandloadHeaderComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
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

    ViewTheProfile(): void {
      this.dialog.open(LandloadProfileComponent, {
        width: '400px',
        disableClose: false,
      });
   }

   onViewBooking(): void {
    this.router.navigate(['/agreement-history']);
   }
}
