import { Component, signal } from '@angular/core';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-customer-sidebar',
  standalone: false,
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.scss'
})
export class CustomerSidebarComponent {

  MenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: 'admin-dashboard' },
    { icon: 'history', label: 'Houses', route: 'available-house' },
    { icon: 'logout', label: 'Logout' }
  ])

  constructor(

  ){}

  onLogout() {

  }

}
