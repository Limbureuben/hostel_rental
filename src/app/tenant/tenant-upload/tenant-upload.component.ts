import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from '../../services/tenant.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tenant-upload',
  standalone: false,
  templateUrl: './tenant-upload.component.html',
  styleUrl: './tenant-upload.component.scss'
})
export class TenantUploadComponent {
  senderPhone = '';
  receiverUsername = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private tenantUploadService: TenantService,
    public dialogRef: MatDialogRef<TenantUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (!this.senderPhone || !this.receiverUsername || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('sender_phone', this.senderPhone);
    formData.append('to_username', this.receiverUsername);
    formData.append('file', this.selectedFile);

    this.tenantUploadService.uploadAgreement(formData).subscribe({
      next: () => {
        alert('Agreement uploaded successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert('Failed to upload agreement.');
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

