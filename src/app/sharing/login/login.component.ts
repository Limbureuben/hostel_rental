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
    trigger('rotateFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateY(90deg)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'rotateY(0deg)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'rotateY(90deg)' }))
      ])
    ])
  ]
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
          // localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('role', response.role);

          if (response.user.isSuperuser) {
            this.router.navigate(['/admin-dashboard']);
          } else if (response.user.isStaff) {
            this.router.navigate(['/landload-dashboard']);
          } else {
            this.router.navigate(['/tenant-dashboard']);
          }
        } else {
          this.toastr.error(response.message || 'Login failed', 'Error', {
            positionClass: 'toast-top-right'
          });
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
    this.router.navigate(['/']);  // Replace '/' with the route you want to navigate to
  }

}
