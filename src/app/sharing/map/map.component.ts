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
      setTimeout(async () => {
        const LModule = await import('leaflet');
        this.L = LModule;
        (window as any).L = LModule;

        await import('leaflet-routing-machine');

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.fromLat = position.coords.latitude;
            this.fromLng = position.coords.longitude;

            console.log('User location:', this.fromLat, this.fromLng);
            console.log('Location accuracy:', position.coords.accuracy, 'meters');

            // Initialize map
            this.map = this.L.map('map').setView([this.fromLat, this.fromLng], 13);

            // Add tile layer
            this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            // Add marker at user's location
            const userMarker = this.L.marker([this.fromLat, this.fromLng])
              .addTo(this.map)
              .bindPopup('You are here')
              .openPopup();

            // Listen for search input
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
            alert('Failed to access your location. Please check browser permissions or use HTTPS.');
          },
          {
            enableHighAccuracy: true,     // ✅ Request best possible location
            timeout: 10000,               // ⏳ Wait up to 10 seconds
            maximumAge: 0                 // 📦 Don't use a cached location
          }
        );
      });
    }
  }

  async searchAndRoute(query: string): Promise<void> {
    const types = [
      'hospital', 'water_source', 'electricity_source', 'school', 'university',
      'port', 'district', 'supermarket', 'mall', 'park'
    ];

    // Construct the Overpass API query with the specified types
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="${query}"](around:10000, ${this.fromLat}, ${this.fromLng});
        way["amenity"="${query}"](around:10000, ${this.fromLat}, ${this.fromLng});
        relation["amenity"="${query}"](around:10000, ${this.fromLat}, ${this.fromLng});
      );
      out body;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(overpassQuery)}`
      });
      const data = await response.json();

      if (data.elements.length > 0) {
        // If we have results, use the first result to plot the location
        const toLat = data.elements[0].lat || (data.elements[0].center && data.elements[0].center.lat);
        const toLng = data.elements[0].lon || (data.elements[0].center && data.elements[0].center.lon);

        // Clear existing route if any
        if (this.currentRoute) {
          this.map.removeControl(this.currentRoute);
        }

        // Create a route
        this.currentRoute = this.L.Routing.control({
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

        // Optionally, add a marker for the destination
        this.L.marker([toLat, toLng]).addTo(this.map).bindPopup('Search Result').openPopup();

      } else {
        alert('No results found.');
      }
    } catch (err) {
      console.error('Error fetching or routing:', err);
    }
  }
}
























// import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Component({
//   selector: 'app-map',
//   standalone: false,
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss']
// })
// export class MapComponent implements AfterViewInit {
//   map: any;
//   L: any;
//   fromLat: number = 0;
//   fromLng: number = 0;
//   currentRoute: any = null;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   ngAfterViewInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       setTimeout(async () => {
//         const LModule = await import('leaflet');
//         this.L = LModule;
//         (window as any).L = LModule;

//         await import('leaflet-routing-machine'); // this needs window.L to be set first

//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             this.fromLat = position.coords.latitude;
//             this.fromLng = position.coords.longitude;

//             this.map = this.L.map('map').setView([this.fromLat, this.fromLng], 13);

//             this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//               attribution: '&copy; OpenStreetMap contributors'
//             }).addTo(this.map);

//             this.L.marker([this.fromLat, this.fromLng])
//               .addTo(this.map)
//               .bindPopup('You are here')
//               .openPopup();

//             const searchBox = document.getElementById('search-box') as HTMLInputElement;
//             if (searchBox) {
//               searchBox.addEventListener('keydown', (event) => {
//                 if (event.key === 'Enter' && searchBox.value.trim() !== '') {
//                   this.searchAndRoute(searchBox.value.trim());
//                 }
//               });
//             }
//           },
//           (error) => {
//             console.error('Geolocation error:', error);
//             alert('Location access denied or failed.');
//           }
//         );
//       });
//     }
//   }

//   async searchAndRoute(query: string): Promise<void> {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.length > 0) {
//         const toLat = parseFloat(data[0].lat);
//         const toLng = parseFloat(data[0].lon);

//         // Clear existing route if any
//         if (this.currentRoute) {
//           this.map.removeControl(this.currentRoute);
//         }

//         // Create new route
//         this.currentRoute = this.L.Routing.control({
//           waypoints: [
//             this.L.latLng(this.fromLat, this.fromLng),
//             this.L.latLng(toLat, toLng)
//           ],
//           routeWhileDragging: false,
//           show: false,
//           addWaypoints: false,
//           draggableWaypoints: false,
//           fitSelectedRoutes: true
//         }).addTo(this.map);
//       } else {
//         alert('No results found.');
//       }
//     } catch (err) {
//       console.error('Error fetching or routing:', err);
//     }
//   }
// }
