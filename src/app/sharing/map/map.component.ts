import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Map, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  map: Map | undefined;
  searchQuery: string = '';
  suggestions: any[] = [];
  locationName: string = '';
  userLocation: [number, number] | null = null;
  routeLayerId = 'route-layer';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    config.apiKey = '9rtSKNwbDOYAoeEEeW9B';
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  initializeMap(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=9rtSKNwbDOYAoeEEeW9B',
      center: [39.230099, -6.774133],
      zoom: 14
    });

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = [position.coords.longitude, position.coords.latitude];
          if (this.map && this.userLocation) {
            new Marker({ color: 'blue' })
              .setLngLat(this.userLocation)
              .addTo(this.map);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported.');
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  fetchSuggestions(): void {
    if (!this.searchQuery) {
      this.suggestions = [];
      return;
    }

    fetch(`https://api.maptiler.com/geocoding/${this.searchQuery}.json?key=9rtSKNwbDOYAoeEEeW9B&country=TZ`)
      .then(res => res.json())
      .then(data => {
        this.suggestions = data.features.map((feature: any) => ({
          name: feature.place_name,
          center: feature.center
        }));
      })
      .catch(err => console.error("Error fetching suggestions:", err));
  }

  searchLocation(): void {
    if (!this.searchQuery) return;

    fetch(`https://api.maptiler.com/geocoding/${this.searchQuery}.json?key=9rtSKNwbDOYAoeEEeW9B&country=TZ`)
      .then(res => res.json())
      .then(data => {
        if (data.features.length > 0) {
          const destination = data.features[0].center;
          this.flyToLocation(destination);
          this.drawRoute(destination);
        }
      })
      .catch(err => console.error("Error fetching location:", err));
  }

  selectSuggestion(suggestion: any): void {
    this.searchQuery = suggestion.name;
    this.flyToLocation(suggestion.center);
    this.drawRoute(suggestion.center);
    this.suggestions = [];
  }

  flyToLocation(center: [number, number]): void {
    this.map?.flyTo({ center, zoom: 14 });
  }

  goBack(): void {
    window.history.back();
  }

  changeMapStyle(styleName: string): void {
    const styleUrl = `https://api.maptiler.com/maps/${styleName}/style.json?key=9rtSKNwbDOYAoeEEeW9B`;
    this.map?.setStyle(styleUrl);
  }

  async drawRoute(destination: [number, number]): Promise<void> {
    if (!this.userLocation) {
      console.error('User location not available.');
      return;
    }

    const url = `https://api.maptiler.com/directions/v2/route/driving/${this.userLocation[0]},${this.userLocation[1]};${destination[0]},${destination[1]}?key=9rtSKNwbDOYAoeEEeW9B&geometries=geojson`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Route data:', data);

      const route = data.routes[0].geometry;

      if (this.map && this.map.isStyleLoaded()) {
        this.addRoute(route);
      } else {
        this.map?.on('load', () => {
          this.addRoute(route);
        });
      }
    } catch (error) {
      console.error('Error drawing route:', error);
    }
  }

  private addRoute(route: any): void {
    // Remove existing route if it exists
    if (this.map?.getLayer(this.routeLayerId)) {
      this.map.removeLayer(this.routeLayerId);
    }
    if (this.map?.getSource(this.routeLayerId)) {
      this.map.removeSource(this.routeLayerId);
    }

    this.map?.addSource(this.routeLayerId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: route,
        properties: {} // Important: properties must be there
      }
    });

    this.map?.addLayer({
      id: this.routeLayerId,
      type: 'line',
      source: this.routeLayerId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 5
      }
    });
  }
}
