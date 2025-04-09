import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: any;
  L: any;
  fromLat: number = 0;
  fromLng: number = 0;
  currentRoute: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(async (L) => {
        this.L = L;

        // Fix the marker icon paths in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png',
        });

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            this.fromLat = position.coords.latitude;
            this.fromLng = position.coords.longitude;

            // Initialize the map with user's location
            this.map = L.map('map').setView([this.fromLat, this.fromLng], 13);

            // Tile Layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            // Add a marker for user's current location
            L.marker([this.fromLat, this.fromLng])
              .addTo(this.map)
              .bindPopup('You are here')
              .openPopup();

            // Set up the search box listener
            const searchBox = document.getElementById('search-box') as HTMLInputElement;
            if (searchBox) {
              searchBox.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && searchBox.value.trim() !== '') {
                  this.searchAndRoute(searchBox.value.trim());
                }
              });
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            alert('Location access denied or failed. Please allow location access.');
          }
        );
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

        // Dynamically import the routing machine and add the route
        const LRouting = await import('leaflet-routing-machine');

        // Optional: Clear any previous route if one exists
        if (this.currentRoute) {
          this.map.removeControl(this.currentRoute);
        }

        // Draw the route from the current location to the searched location
        this.currentRoute = LRouting.control({
          waypoints: [
            this.L.latLng(this.fromLat, this.fromLng),
            this.L.latLng(toLat, toLng)
          ],
          routeWhileDragging: false,
          show: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true
        }).addTo(this.map);
      } else {
        alert('No results found.');
      }
    } catch (err) {
      console.error('Error fetching or routing:', err);
    }
  }
}
