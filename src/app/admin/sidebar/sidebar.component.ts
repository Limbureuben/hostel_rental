import { Component, signal } from '@angular/core';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  MenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: 'admin-dashboard'},
    { icon: 'map', label: 'Houses', route: 'available-house' },
    { icon: 'logout', label: 'Logout' }
  ])

  constructor(

  ){}

  onLogout() {

  }

}
