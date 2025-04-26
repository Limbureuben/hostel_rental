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
  suggestions: any[] = [];

  userLocation: [number, number] = [39.2083, -6.7924]; // Dar-es-Salaam (lng, lat)
  destination: [number, number] = [39.2800, -6.7500]; // Example destination (lng, lat)

  searchQuery: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.L = await import('leaflet');

      this.map = this.L.map(this.mapContainer.nativeElement, {
        center: [this.userLocation[1], this.userLocation[0]],
        zoom: 13
      });

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

      const baseMaps = {
        "Street": streetMap,
        "Topography": topoMap,
        "Satellite": satelliteMap
      };
      this.L.control.layers(baseMaps).addTo(this.map);

      this.L.marker([this.userLocation[1], this.userLocation[0]]).addTo(this.map).bindPopup('You are here').openPopup();
      this.L.marker([this.destination[1], this.destination[0]]).addTo(this.map).bindPopup('Destination');

      await this.drawRoute();
    }
  }

  async searchLocation() {
    if (!this.searchQuery.trim()) {
      return;
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`);
      const results = await response.json();

      if (results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);

        this.map.setView([lat, lon], 14);

        this.destination = [lon, lat];

        this.map.eachLayer((layer: any) => {
          if (layer instanceof this.L.Marker || layer instanceof this.L.Polyline) {
            this.map.removeLayer(layer);
          }
        });

        const streetMap = this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Street &copy; OpenStreetMap contributors'
        });
        streetMap.addTo(this.map);

        this.L.marker([this.userLocation[1], this.userLocation[0]]).addTo(this.map).bindPopup('You are here');
        this.L.marker([lat, lon]).addTo(this.map).bindPopup('Destination');

        await this.drawRoute();
      } else {
        alert('Location not found!');
      }

    } catch (error) {
      console.error('Search error:', error);
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
