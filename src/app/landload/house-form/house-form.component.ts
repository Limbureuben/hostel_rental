import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HouseHistoryComponent } from '../house-history/house-history.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandlordService } from '../../services/landlord.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  selectedImage!: File | null;
  isSubmitting: boolean = false;

  constructor(
    @Optional() public dialogRef: MatDialogRef<HouseFormComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private landhouseservice: LandlordService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.HouseData = this.fb.group({
      house_type: ['', Validators.required],
      number_of_rooms: ['', Validators.required],
      price_per_month: ['', Validators.required],
      location: ['', Validators.required],
      availability_date: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  Submit() {
    // Check for invalid form or missing image
    if (this.HouseData.invalid || !this.selectedImage) {
      this.toast.warning('Please fill all fields and select an image', 'Validation Warning');
      return;
    }

    // Disable the button to prevent double submission
    this.isSubmitting = true;

    const formData = new FormData();

    const rawDate = this.HouseData.get('availability_date')?.value;
    const formattedDate = this.formatDate(rawDate);

    formData.append('house_type', this.HouseData.get('house_type')?.value);
    formData.append('number_of_rooms', this.HouseData.get('number_of_rooms')?.value);
    formData.append('price_per_month', this.HouseData.get('price_per_month')?.value);
    formData.append('location', this.HouseData.get('location')?.value);
    formData.append('availability_date', formattedDate); // <-- formatted
    formData.append('contact', this.HouseData.get('contact')?.value);
    formData.append('image', this.selectedImage!);

    // Make the API request
    this.landhouseservice.AddHouse(formData).subscribe({
      next: () => {
        // Close the dialog first
        this.dialogRef?.close();

        // Use setTimeout to show SweetAlert after the dialog is closed
        setTimeout(() => {
          Swal.fire({
            title: 'House Details uploaded!',
            text: 'Successfully!!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Reset the form after the alert
            this.HouseData.reset();
            this.selectedImage = null;
          });
        }, 200);  // Delay in ms to ensure the dialog is closed first
      },
      error: (err) => {
        // Handle any errors during the submission
        console.error('Submission failed', err);
        this.toast.error('Failed to submit house', 'Error');
      },
      complete: () => {
        // Re-enable the button after submission completes
        this.isSubmitting = false;
      }
    });
  }
  
  private formatDate(date: any): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }

  ViewHouseHistory() {
    this.dialog.open(HouseHistoryComponent, {
      width: '1200px',
        height: '500px',
        disableClose: false
    });
  }
}
