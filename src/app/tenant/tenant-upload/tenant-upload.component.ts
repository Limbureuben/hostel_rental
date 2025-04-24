import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from '../../services/tenant.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tenant-upload',
  standalone: false,
  templateUrl: './tenant-upload.component.html',
  styleUrl: './tenant-upload.component.scss'
})
export class TenantUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private tenantUploadService: TenantService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TenantUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.uploadForm = this.fb.group({
      senderPhone: ['', Validators.required],
      receiverUsername: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      console.warn('Form is invalid or file not selected');
      return;
    }

    const formData = new FormData();
    formData.append('phone', this.uploadForm.get('senderPhone')?.value);
    formData.append('to_username', this.uploadForm.get('receiverUsername')?.value);
    formData.append('file', this.selectedFile);

    console.log('Submitting agreement with:', {
      phone: this.uploadForm.get('senderPhone')?.value,
      to: this.uploadForm.get('receiverUsername')?.value,
      file: this.selectedFile.name
    });

    this.tenantUploadService.uploadAgreement(formData).subscribe({
      next: (res) => {
        console.log('Upload success:', res);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Upload failed:', err);
      }
    });
  }
}

