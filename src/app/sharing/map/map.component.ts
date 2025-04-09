import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

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
      // Delay code execution to ensure everything is initialized after page load
      setTimeout(async () => {
        // Import leaflet only in the browser
        const LModule = await import('leaflet');
        this.L = LModule;

        // Set the global window.L (only in browser)
        if (isPlatformBrowser(this.platformId)) {
          (window as any).L = LModule;
        }

        // Import leaflet-routing-machine after setting window.L
        await import('leaflet-routing-machine');

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.fromLat = position.coords.latitude;
            this.fromLng = position.coords.longitude;

            this.map = this.L.map('map').setView([this.fromLat, this.fromLng], 13);

            this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            this.L.marker([this.fromLat, this.fromLng])
              .addTo(this.map)
              .bindPopup('You are here')
              .openPopup();

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
            alert('Location access denied or failed.');
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

        // Clear any previous routes
        if (this.currentRoute) {
          this.map.removeControl(this.currentRoute);
        }

        // Use leaflet-routing-machine to create a route
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
