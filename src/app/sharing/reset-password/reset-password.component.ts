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
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.token = this.route.snapshot.paramMap.get('token')!;

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitNewPassword(): void {
    if (this.resetForm.valid) {
      const { password, confirmPassword } = this.resetForm.value;

      if (password !== confirmPassword) {
        Swal.fire('Oops!', 'Passwords do not match.', 'error');
        return;
      }

      // Encode UID to base64 before sending to the backend
      const encodedUid = btoa(this.uid);  // Encode the UID

      this.authService.resetPassword(encodedUid, this.token, password).subscribe({
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
    }
  }
}
