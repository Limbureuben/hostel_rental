import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add Mapbox tile layer
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN', {
          attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          tileSize: 512,
          zoomOffset: -1
        }).addTo(map);

        // Add a geocoder control
        const geocoder = L.Control.geocoder({
          query: 'hospital',
          provider: new L.Control.Geocoder.Nominatim()
        }).addTo(map);

        // Example search for hospitals using Mapbox Geocoding API
        const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`;

        fetch(queryUrl)
          .then(response => response.json())
          .then(data => {
            if (data && data.features.length > 0) {
              data.features.forEach(item => {
                const lat = item.geometry.coordinates[1];
                const lon = item.geometry.coordinates[0];
                L.marker([lat, lon]).addTo(map)
                  .bindPopup(item.place_name)
                  .openPopup();
              });
            }
          });
      });
    }
  }


}
