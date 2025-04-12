import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HouseHistoryComponent } from '../house-history/house-history.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandlordService } from '../../services/landlord.service';
import { error } from 'console';

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
export class HouseFormComponent implements OnInit{
  HouseData!: FormGroup;
  selectedImage!: File;

  constructor(
    @Optional() public dialogRef: MatDialogRef<HouseFormComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private landhouseservice: LandlordService
  ) {}

  ngOnInit() {
    this.HouseData = this.fb.group({
      house_type: ['', Validators.required],
      number_of_rooms: ['', Validators.required],
      price_per_month: ['', Validators.required],
      location: ['', Validators.required],
      availability_date: ['', Validators.required],
      contact: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  Submit() {
    if (this.HouseData.invalid || !this.selectedImage) {
      alert('Please fill all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('house_type', this.HouseData.get('house_type')?.value);
    formData.append('number_of_rooms', this.HouseData.get('number_of_rooms')?.value);
    formData.append('price_per_month', this.HouseData.get('price_per_month')?.value);
    formData.append('location', this.HouseData.get('location')?.value);
    formData.append('availability_date', this.HouseData.get('availability_date')?.value);
    formData.append('contact', this.HouseData.get('contact')?.value);
    formData.append('image', this.selectedImage);

    this.landhouseservice.AddHouse(formData).subscribe({
      next:() => {
        alert('House submitted successfully!');
        this.HouseData.reset();
      },
      error: (err) => {
        console.error('Submission failed', err);
        alert('Failed to submit house');
      }
    })
  }












  ViewHouseHistory() {
    this.dialog.open(HouseHistoryComponent, {
      width: '1200px',
        height: '500px',
        disableClose: false
    });
  }

}
