import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private location: Location,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  submitEmail(): void {
    if (this.emailControl.valid) {
      this.authService.forgotPassword(this.emailControl.value!).subscribe({
        next: (response) => {
          this.snackBar.open('Reset link sent to your email', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Failed to send reset link. Please try again.', 'Close', { duration: 3000 });
        }
      })
    }
  }

  goBack() {
    this.location.back()
  }

}
