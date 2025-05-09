import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService
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
    this.router.navigate(['/homepage'])
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/login']);
    this.toastr.success('Logout success', 'Success');
  }
}
