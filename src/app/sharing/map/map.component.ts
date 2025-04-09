import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load Leaflet only in the browser
      import('leaflet').then(async (L) => {
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser');
          return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const map = L.map('map').setView([userLat, userLng], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          L.marker([userLat, userLng])
            .addTo(map)
            .bindPopup('You are here')
            .openPopup();

          // Perform search + route to destination
          this.searchAndRoute(map, userLat, userLng, 'hospital');
        }, () => {
          alert('Unable to retrieve your location');
        });
      });
    }
  }

  async searchAndRoute(map: any, fromLat: number, fromLng: number, query: string): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const toLat = parseFloat(data[0].lat);
        const toLng = parseFloat(data[0].lon);
        const toName = data[0].display_name;

        const L = await import('leaflet');
        const Routing = await import('leaflet-routing-machine');

        L.marker([toLat, toLng]).addTo(map)
          .bindPopup(toName)
          .openPopup();

        Routing.default.control({
          waypoints: [
            L.latLng(fromLat, fromLng),
            L.latLng(toLat, toLng)
          ],
          routeWhileDragging: false
        }).addTo(map);
      } else {
        alert('No results found.');
      }
    } catch (err) {
      console.error('Error during search and routing:', err);
    }
  }
}
