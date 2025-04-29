import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from '../../services/tenant.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-tenant-upload',
  standalone: false,
  templateUrl: './tenant-upload.component.html',
  styleUrl: './tenant-upload.component.scss'
})
export class TenantUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;


  constructor(
    private fb: FormBuilder,
    private tenantUploadService: TenantService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TenantUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.uploadForm = this.fb.group({
      senderPhone: ['', Validators.required],
      receiverUsername: [data?.receiverUsername || '', Validators.required] // prefill with username if available
    });
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  // Handle form submission
  // onSubmit(): void {
  //   if (this.uploadForm.invalid || !this.selectedFile) {
  //     console.warn('Form is invalid or file not selected');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('sender_phone', this.uploadForm.get('senderPhone')?.value);
  //   formData.append('to_user', this.uploadForm.get('receiverUsername')?.value); // pass actual username
  //   formData.append('file', this.selectedFile);

  //   console.log('Submitting agreement with:', {
  //     phone: this.uploadForm.get('senderPhone')?.value,
  //     to: this.uploadForm.get('receiverUsername')?.value,
  //     file: this.selectedFile.name
  //   });

  //   this.tenantUploadService.uploadAgreement(formData).subscribe({
  //     next: (res) => {
  //       this.toastr.success('Agreement uploaded successfully!', 'Success');
  //       this.dialogRef.close();
  //     },
  //     error: (err) => {
  //       console.error('Upload error:', err); // Log the error for debugging
  //       this.toastr.error('Failed to upload agreement. Please try again.', 'Error');
  //     }
  //   });
  // }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      console.warn('Form is invalid or file not selected');
      return;
    }

    const formData = new FormData();
    formData.append('sender_phone', this.uploadForm.get('senderPhone')?.value);
    formData.append('to_user', this.uploadForm.get('receiverUsername')?.value);
    formData.append('file', this.selectedFile);

    this.isUploading = true;
    this.uploadProgress = 0;

    let interval: any; // Store interval globally

    this.tenantUploadService.uploadAgreement(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const realProgress = Math.round((100 * event.loaded) / event.total);
          const target = realProgress > 95 ? 95 : realProgress; // Animate up to 95%

          if (interval) clearInterval(interval);
          interval = setInterval(() => {
            if (this.uploadProgress < target) {
              this.uploadProgress += 1;
            } else {
              clearInterval(interval);
            }
          }, 60); // smaller = faster animation
        } else if (event.type === HttpEventType.Response) {
          // Server says upload complete
          if (interval) clearInterval(interval);

          interval = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 1;
            } else {
              clearInterval(interval);
              // Only after full 100%:
              this.toastr.success('Agreement uploaded successfully!', 'Success');
              this.dialogRef.close();
            }
          }, 15); // speed up final 95 -> 100
        }
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.toastr.error('Failed to upload agreement. Please try again.', 'Error');
        this.isUploading = false;
        if (interval) clearInterval(interval);
      },
      complete: () => {
        this.isUploading = false;
      }
    });
  }


}
