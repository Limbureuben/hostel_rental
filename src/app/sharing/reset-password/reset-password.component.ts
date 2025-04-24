import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  uid!: string;
  token!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract route parameters for UID and token
    this.uid = this.route.snapshot.paramMap.get('uidb64')!;
    this.token = this.route.snapshot.paramMap.get('token')!;

    // Initialize form with validation
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitNewPassword(): void {
    if (this.resetForm.valid) {
      const { password, confirmPassword } = this.resetForm.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        Swal.fire('Oops!', 'Passwords do not match.', 'error');
        return;
      }

      // Call API to reset password
      this.authService.resetPassword(this.uid, this.token, password).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Password reset successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid or expired token',
            text: err?.error?.error || 'Please try again with a new reset link.',
          });
        }
      });

    } else {
      Swal.fire('Form Invalid', 'Please fill in all fields correctly.', 'warning');
    }
  }

}
