import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(
    private router: Router
  ) {}

  toggleMenu() {

  }

  TenantNavigation() {
    this.router.navigate(['/landload-dashboard']);
  }

  LandloadNavigation() {
    this.router.navigate(['/tenant-dashboard']);
  }

  goBack() {
    this.router.navigate(['/login'])
  }
}
