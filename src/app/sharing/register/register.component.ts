import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  // animations: [
  //   trigger('slideBounce', [
  //     transition(':enter', [
  //       style({ transform: 'translateY(-100%)', opacity: 0 }),
  //       animate('600ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  //         style({ transform: 'translateY(0)', opacity: 1 }))
  //     ]),
  //     transition(':leave', [
  //       animate('300ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
  //     ])
  //   ])
  // ]
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerservice: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required],
      }, { validators: this.passwordsMatchValidator });
  }

  passwordStrengthValidator(control: any) {
    const value = control.value;
    if (!value) return { weakPassword: true };

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength) {
      return null;
    }
    return { weakPassword: true };
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if(!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Enter valid values', 'Validation Error', { positionClass: 'toast-top-right' });
      return;
    }

    const registrationData: RegisterData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };

    console.log("Sending Registration Data:", registrationData);

    this.registerservice.registerUser(registrationData).subscribe({
      next: (result) => {
        const response = result.data?.registerUser;

        if (!response) {
          this.toastr.error('Unexpected response from server', 'Error');
          return;
        }

        if (response.success) {
          this.toastr.success(response.message, 'Success', { positionClass: 'toast-top-right' });

          this.registerForm.reset();
          Object.keys(this.registerForm.controls).forEach(key => {
            this.registerForm.controls[key].setErrors(null);
          });

          this.router.navigate(['/login']).then(success => {
            if (!success) console.error("Navigation failed!");
          });

        } else {
          this.toastr.error(response.message || 'Registration failed', 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong. Please try again.', 'Error');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/'])
  }
}
