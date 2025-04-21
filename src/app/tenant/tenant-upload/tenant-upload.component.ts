import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenant-upload',
  standalone: false,
  templateUrl: './tenant-upload.component.html',
  styleUrl: './tenant-upload.component.scss'
})
export class TenantUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  matchedHouse: any = null;

  constructor(
    private fb: FormBuilder,
    private tenantUploadService: TenantService,
    private snackBar: MatSnackBar
  ) {
    this.uploadForm = this.fb.group({
      username: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (!this.uploadForm.valid || !this.selectedFile) {
      this.snackBar.open('Please complete the form and select a file.', 'Close', {
        duration: 3000
      });
      return;
    }

    const formData = new FormData();
    formData.append('username', this.uploadForm.get('username')?.value);
    formData.append('phone_number', this.uploadForm.get('phone_number')?.value);
    formData.append('file', this.selectedFile);

    this.tenantUploadService.uploadAgreement(formData).subscribe({
      next: (res) => {
        this.snackBar.open('Uploaded successfully!', 'Close', { duration: 3000 });
        this.matchedHouse = res.house || null;
      },
      error: () => {
        this.snackBar.open('Upload failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }



}
