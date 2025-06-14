import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginData } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
  trigger('slideBounce', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)', opacity: 0 }),
      animate('600ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
    ])
  ])
]
// slideBounce
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginservice: AuthService,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['',Validators.required],
        password: ['', Validators.required]
      })
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      this.toastr.error('Please enter valid credentials', 'Error', {
        positionClass: 'toast-top-right'
      });
      return;
    }
    const loginData: LoginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.loginservice.loginUser(loginData).subscribe({
      next: (result) => {
        const response = result.data.loginUser;

        if (response.success) {
          this.toastr.success('Login successful', 'Success', {positionClass: 'toast-top-right'});

          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('role', response.role);

          console.log('Token stored:', response.token);

          const selectedRole = localStorage.getItem('selectedRole');

          if (response.user.isStaff) {
            this.router.navigate(['/admin']);
          } else if (selectedRole === 'tenant') {
            this.router.navigate(['/tenant-dashboard']);
          } else if(selectedRole === 'landlord') {
            this.router.navigate(['/landload-dashboard']);
          } else {
            this.toastr.error(response.message || 'Login failed', 'Error', {
            positionClass: 'toast-top-right'
          });
          }

        //   if (response.user.isStaff) {
        //     this.router.navigate(['/admin']);
        //   } else {
        //     this.router.navigate(['/homepage']);
        //   }
        // } else {
        //   this.toastr.error(response.message || 'Login failed', 'Error', {
        //     positionClass: 'toast-top-right'
        //   });
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong. Please try again.', 'Error', {
          positionClass: 'toast-top-right'
        });
      }
    })
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
