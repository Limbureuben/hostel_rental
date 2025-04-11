import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HouseHistoryComponent } from '../house-history/house-history.component';

@Component({
  selector: 'app-house-form',
  standalone: false,
  templateUrl: './house-form.component.html',
  styleUrl: './house-form.component.scss',
  animations: [
    trigger('formAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      transition(':enter', [
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class HouseFormComponent {

  constructor(@Optional() public dialogRef: MatDialogRef<HouseFormComponent>, private dialog: MatDialog) {}

  ViewHouseHistory() {
    this.dialog.open(HouseHistoryComponent, {

    })
  }

}
