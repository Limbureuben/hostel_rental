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
    // Ensure this only runs in the browser, not SSR
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        // Initialize the map
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Create a marker for demonstration
        L.marker([51.5, -0.09]).addTo(map)
          .bindPopup('A marker')
          .openPopup();

        // Search functionality
        const searchBox = document.getElementById('search-box') as HTMLInputElement;

        // Listen for the input in the search box
        searchBox.addEventListener('input', (event) => {
          const query = searchBox.value.trim();

          if (query.length > 0) {
            this.searchService(map, query);  // Call the searchService method here
          }
        });
      });
    }
  }

  // Define searchService method
  searchService(map: any, query: string): void {
    // Query for services using OpenStreetMap's Nominatim API
    const queryUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`;

    fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        // Clear existing markers on the map
        map.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // If there are results, add them to the map
        if (data && data.length > 0) {
          data.forEach(item => {
            const lat = item.lat;
            const lon = item.lon;

            L.marker([lat, lon]).addTo(map)
              .bindPopup(item.display_name)
              .openPopup();
          });
        } else {
          alert('No results found!');
        }
      })
      .catch(err => console.error('Error fetching search results:', err));
  }
}
