import { Component } from '@angular/core';


@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent  {
    mapUrl: string = 'https://www.google.com/maps?q=-6.752629,39.210418&output=embed';
  location: any;

  goBack() {
  this.location.back(); // navigates to the previous page
}

}
