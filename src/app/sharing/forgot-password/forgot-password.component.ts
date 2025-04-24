import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  emailForm!: FormGroup;

  constructor(
    private location: Location,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submitEmail(): void {
    console.log('Form value:', this.emailForm.value);
    console.log('Form valid?', this.emailForm.valid);

    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Reset link sent to your email',
            showConfirmButton: false,
            timer: 1500
          });

          this.emailForm.reset();
        },
        error: (error) => {
          this.snackBar.open('Failed to send reset link. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please enter a valid email address', 'Close', { duration: 3000 });
    }
  }



  goBack() {
    this.location.back()
  }

}
