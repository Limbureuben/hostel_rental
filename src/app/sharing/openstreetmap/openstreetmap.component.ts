import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-openstreetmap',
  standalone: false,
  templateUrl: './openstreetmap.component.html',
  styleUrl: './openstreetmap.component.scss'
})
export class OpenstreetmapComponent implements AfterViewInit{

  private map!: L.Map;

  private userLocation: [number, number] = [39.2331264, -6.8190208]; // Example: Dar es Salaam
  private destination: [number, number] = [39.2193239, -6.7693830];  // Example destination

  ngAfterViewInit(): void {
    this.initMap();
    this.drawRoute();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.userLocation[1], this.userLocation[0]],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Add user marker
    L.marker([this.userLocation[1], this.userLocation[0]]).addTo(this.map)
      .bindPopup('You are here')
      .openPopup();

    // Add destination marker
    L.marker([this.destination[1], this.destination[0]]).addTo(this.map)
      .bindPopup('Destination');
  }

  private async drawRoute(): Promise<void> {
    const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car/geojson`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': '5b3ce3597851110001cf6248e536cc2e38174bc0b11de4674f25c7e5',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: [
          [this.userLocation[0], this.userLocation[1]], // [lon, lat]
          [this.destination[0], this.destination[1]]
        ]
      })
    });

    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      const coords = data.features[0].geometry.coordinates;
      const latlngs = coords.map((c: [number, number]) => [c[1], c[0]]); // flip [lon, lat] -> [lat, lon]

      const polyline = L.polyline(latlngs, { color: 'blue', weight: 5 }).addTo(this.map);
      this.map.fitBounds(polyline.getBounds());
    } else {
      console.error('No route found!');
    }
  }

}
