import { Component } from '@angular/core';

@Component({
  selector: 'app-landload-map',
  standalone: false,
  templateUrl: './landload-map.component.html',
  styleUrl: './landload-map.component.scss'
})
export class LandloadMapComponent {
    mapUrl: string = 'https://www.google.com/maps?q=-6.752629,39.210418&output=embed';
    location: any;

    goBack() {
    this.location.back();
  }

}
