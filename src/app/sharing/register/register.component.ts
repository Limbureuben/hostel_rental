import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        role: ['', Validators.required]
      })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Data:', formData);
      // Send formData to your GraphQL mutation or backend API
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    this.router.navigate(['/'])
  }


}
