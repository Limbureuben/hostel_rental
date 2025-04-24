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
  selectedFile: File | null = null;

  agreementForm = {
    phone: '',
    toUsername: ''
  };

  constructor(
    private fb: FormBuilder,
    private tenantUploadService: TenantService,
    public dialogRef: MatDialogRef<TenantUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // onSubmit(): void {
  //   if (!this.uploadForm.valid || !this.selectedFile) {
  //     this.snackBar.open('Please complete the form and select a file.', 'Close', {
  //       duration: 3000
  //     });
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('username', this.uploadForm.get('username')?.value);
  //   formData.append('phone_number', this.uploadForm.get('phone_number')?.value);
  //   formData.append('file', this.selectedFile);

  //   this.tenantUploadService.uploadAgreement(formData).subscribe({
  //     next: (res) => {
  //       this.snackBar.open('Uploaded successfully!', 'Close', { duration: 3000 });
  //       this.matchedHouse = res.house || null;
  //     },
  //     error: () => {
  //       this.snackBar.open('Upload failed. Please try again.', 'Close', { duration: 3000 });
  //     }
  //   });
  // }

  onSubmit() {
    console.log('Form submitted');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
