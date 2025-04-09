import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;
  private L: any;
  private fromLat: number = 0;
  private fromLng: number = 0;
  private routingControl: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(async (L) => {
        this.L = L;

        navigator.geolocation.getCurrentPosition(async (position) => {
          this.fromLat = position.coords.latitude;
          this.fromLng = position.coords.longitude;

          this.map = L.map('map').setView([this.fromLat, this.fromLng], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(this.map);

          L.marker([this.fromLat, this.fromLng])
            .addTo(this.map)
            .bindPopup('You are here')
            .openPopup();

          // Set up search box listener
          const searchBox = document.getElementById('search-box') as HTMLInputElement;
          if (searchBox) {
            searchBox.addEventListener('keydown', (event) => {
              if (event.key === 'Enter' && searchBox.value.trim() !== '') {
                this.searchAndRoute(searchBox.value.trim());
              }
            });
          }
        });
      });
    }
  }

  async searchAndRoute(query: string): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const toLat = parseFloat(data[0].lat);
        const toLng = parseFloat(data[0].lon);
        const toName = data[0].display_name;

        this.L.marker([toLat, toLng]).addTo(this.map)
          .bindPopup(toName)
          .openPopup();

        const Routing = await import('leaflet-routing-machine');

        // Remove previous route if it exists
        if (this.routingControl) {
          this.map.removeControl(this.routingControl);
        }

        this.routingControl = Routing.default.control({
          waypoints: [
            this.L.latLng(this.fromLat, this.fromLng),
            this.L.latLng(toLat, toLng)
          ],
          routeWhileDragging: false
        }).addTo(this.map);
      } else {
        alert('No results found.');
      }
    } catch (err) {
      console.error('Error during search and routing:', err);
    }
  }
}
