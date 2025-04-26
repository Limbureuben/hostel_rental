import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-openstreetmap',
  standalone: false,
  templateUrl: './openstreetmap.component.html',
  styleUrl: './openstreetmap.component.scss'
})
export class OpenstreetmapComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;
  map: any;
  L: any;

  userLocation: [number, number] = [39.2083, -6.7924]; // Dar-es-Salaam (lng, lat)
  destination: [number, number] = [39.2800, -6.7500]; // Example destination (lng, lat)

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    // Only run on the client side (browser)
    if (isPlatformBrowser(this.platformId)) {
      this.L = await import('leaflet');
      const Geocoder = await import('leaflet-control-geocoder');

      // Initialize map
      this.map = this.L.map(this.mapContainer.nativeElement, {
        center: [this.userLocation[1], this.userLocation[0]],
        zoom: 13
      });

      // Define base tile layers
      const streetMap = this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Street &copy; OpenStreetMap contributors'
      });

      const topoMap = this.L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Topo &copy; OpenTopoMap contributors'
      });

      const satelliteMap = this.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Satellite &copy; ESRI'
      });

      streetMap.addTo(this.map);

      // Layer control
      const baseMaps = {
        "Street": streetMap,
        "Topography": topoMap,
        "Satellite": satelliteMap
      };
      this.L.control.layers(baseMaps).addTo(this.map);

      // Add search bar (geocoder)
      const geocoderControl = (this.L.Control as any).geocoder({
        defaultMarkGeocode: true
      })
      .on('markgeocode', (e: any) => {
        const center = e.geocode.center;

        // Move the map to the searched location
        this.map.setView(center, 14);

        // Set destination to new location (optional)
        this.destination = [center.lng, center.lat];

        // Clear existing markers and route
        this.map.eachLayer((layer: any) => {
          if (layer instanceof this.L.Marker || layer instanceof this.L.Polyline) {
            this.map.removeLayer(layer);
          }
        });

        // Re-add base layers
        streetMap.addTo(this.map);

        // Re-add layer control
        this.L.control.layers(baseMaps).addTo(this.map);

        // Add markers
        this.L.marker([this.userLocation[1], this.userLocation[0]]).addTo(this.map).bindPopup('You are here');
        this.L.marker([this.destination[1], this.destination[0]]).addTo(this.map).bindPopup('Destination');

        // Redraw route
        this.drawRoute();
      })
      .addTo(this.map);

      // Add initial markers
      this.L.marker([this.userLocation[1], this.userLocation[0]]).addTo(this.map).bindPopup('You are here').openPopup();
      this.L.marker([this.destination[1], this.destination[0]]).addTo(this.map).bindPopup('Destination');

      // Draw initial route
      await this.drawRoute();
    }
  }

  async drawRoute(): Promise<void> {
    try {
      const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
        method: 'POST',
        headers: {
          'Authorization': '5b3ce3597851110001cf6248e536cc2e38174bc0b11de4674f25c7e5',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coordinates: [
            [this.userLocation[0], this.userLocation[1]],
            [this.destination[0], this.destination[1]]
          ]
        })
      });

      if (!response.ok) {
        console.error('Failed to get route');
        return;
      }

      const data = await response.json();

      const routeCoords = data.features[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);

      this.L.polyline(routeCoords, { color: 'blue', weight: 5 }).addTo(this.map);

    } catch (error) {
      console.error('Error drawing route:', error);
    }
  }
}
