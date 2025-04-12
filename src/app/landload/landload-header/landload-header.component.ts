import { Component } from '@angular/core';
import { HouseFormComponent } from '../house-form/house-form.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landload-header',
  standalone: false,
  templateUrl: './landload-header.component.html',
  styleUrl: './landload-header.component.scss'
})
export class LandloadHeaderComponent {

  constructor(
    private router: Router,
    private dialog: MatDialog
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

}
