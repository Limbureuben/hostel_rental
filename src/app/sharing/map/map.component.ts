import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const map = L.map('map').setView([userLat, userLng], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          const userMarker = L.marker([userLat, userLng])
            .addTo(map)
            .bindPopup('You are here')
            .openPopup();

          // Perform search and routing
          this.searchAndRoute(map, userLat, userLng, 'hospital');
        });
      });
    }
  }


  searchAndRoute(map: any, fromLat: number, fromLng: number, query: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

    fetch(url)
      .then(response => response.json())
      .then(async data => {
        if (data.length > 0) {
          const toLat = parseFloat(data[0].lat);
          const toLng = parseFloat(data[0].lon);
          const toName = data[0].display_name;

          // Marker for the destination
          const L = (await import('leaflet')).default;
          L.marker([toLat, toLng]).addTo(map)
            .bindPopup(toName)
            .openPopup();

          // Routing
          const { default: Routing } = await import('leaflet-routing-machine');
          Routing.control({
            waypoints: [
              L.latLng(fromLat, fromLng),
              L.latLng(toLat, toLng)
            ],
            routeWhileDragging: false
          }).addTo(map);
        } else {
          alert('No results found.');
        }
      });
  }

}
