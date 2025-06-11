import { Component } from '@angular/core';

@Component({
  selector: 'app-tenant-map',
  standalone: false,
  templateUrl: './tenant-map.component.html',
  styleUrl: './tenant-map.component.scss'
})
export class TenantMapComponent {
    mapUrl: string = 'https://www.google.com/maps?q=-6.752629,39.210418&output=embed';
    location: any;

    goBack() {
    this.location.back();
  }
}
