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
      setTimeout(async () => {
        const LModule = await import('leaflet');
        this.L = LModule;
        (window as any).L = LModule;

        await import('leaflet-routing-machine'); // this needs window.L to be set first

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
    const searchQuery = encodeURIComponent(query); // Ensure query is properly encoded
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&addressdetails=1&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const toLat = parseFloat(data[0].lat);
        const toLng = parseFloat(data[0].lon);

        // Add a marker with custom icon based on category
        const locationType = data[0].type; // e.g., "park", "hospital"
        let customIcon;

        if (locationType === 'hospital') {
          customIcon = L.icon({ iconUrl: 'hospital-icon.png', iconSize: [32, 32] });
        } else if (locationType === 'park') {
          customIcon = L.icon({ iconUrl: 'park-icon.png', iconSize: [32, 32] });
        } else {
          customIcon = L.icon({ iconUrl: 'default-icon.png', iconSize: [32, 32] });
        }

        this.L.marker([toLat, toLng], { icon: customIcon }).addTo(this.map)
          .bindPopup(`${data[0].display_name}`)
          .openPopup();

        // Route to the destination
        this.routeToDestination(toLat, toLng);
      } else {
        alert('No results found.');
      }
    } catch (err) {
      console.error('Error fetching or routing:', err);
    }
  }

  routeToDestination(toLat: number, toLng: number): void {
    // Remove any existing route
    if (this.currentRoute) {
      this.map.removeControl(this.currentRoute);
    }

    // Create and add the new route
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
