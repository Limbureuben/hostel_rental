import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);  // Replace '/' with the route you want to navigate to
  }

}
