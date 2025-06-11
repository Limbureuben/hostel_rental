import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hellopage',
  standalone: false,
  templateUrl: './hellopage.component.html',
  styleUrl: './hellopage.component.scss'
})
export class HellopageComponent implements OnInit{
  animate = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 100);
  }

  goToSignup(): void {
    this.router.navigate(['/homepage']);
  }

  goToGetStarted(): void {
    this.router.navigate(['/homepage']);
  }

  selectRole(role: 'tenant' | 'landlord') {
  localStorage.setItem('selectedRole', role);
  this.router.navigate(['/login']);
}

}
