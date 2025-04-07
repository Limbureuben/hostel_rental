import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerservice: AuthService
  ) {}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        role: ['', Validators.required]
      })
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.registerservice.registerUser()
    }
  }

  goBack(): void {
    this.router.navigate(['/'])
  }


}
