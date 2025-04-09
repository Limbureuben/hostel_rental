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
  suggestions: string[] = []; // Store suggestion results

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
              searchBox.addEventListener('input', (event) => {
                if (searchBox.value.trim() !== '') {
                  this.getSuggestions(searchBox.value.trim());
                } else {
                  this.suggestions = []; // Clear suggestions if input is empty
                }
              });

              // Listen for selection of a suggestion
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

  // Fetch suggestions from Nominatim API
  async getSuggestions(query: string): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.suggestions = data.map((result: any) => result.display_name); // Extract location names
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  }

  // When a suggestion is selected or enter is pressed
  async searchAndRoute(query: string): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const toLat = parseFloat(data[0].lat);
        const toLng = parseFloat(data[0].lon);

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
