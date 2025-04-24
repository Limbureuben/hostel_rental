import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  constructor(
    private location: Location
  ) {}

  submitEmail() {

  }

  goBack() {
    this.location.back()
  }

}
