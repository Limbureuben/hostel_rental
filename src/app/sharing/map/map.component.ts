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

  map?: Map;
  searchQuery: string = '';
  suggestions: { name: string; center: [number, number] }[] = [];
  userLocation: [number, number] | null = null;
  private readonly apiKey = '9rtSKNwbDOYAoeEEeW9B';
  private readonly routeLayerId = 'route-layer';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    config.apiKey = this.apiKey;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initializeMap(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${this.apiKey}`,
      center: [39.230099, -6.774133],
      zoom: 14
    });

    this.getUserLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          if (this.map) {
            new Marker({ color: 'blue' })
              .setLngLat(this.userLocation)
              .addTo(this.map);
          }
        },
        (error) => console.error('Error getting user location:', error)
      );
    } else {
      console.error('Geolocation not supported.');
    }
  }

  fetchSuggestions(): void {
    if (!this.searchQuery.trim()) {
      this.suggestions = [];
      return;
    }

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(this.searchQuery)}.json?key=${this.apiKey}&country=TZ`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.suggestions = data.features.map((feature: any) => ({
          name: feature.place_name,
          center: feature.center
        }));
      })
      .catch(err => console.error('Error fetching suggestions:', err));
  }

  searchLocation(): void {
    if (!this.searchQuery.trim()) return;

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(this.searchQuery)}.json?key=${this.apiKey}&country=TZ`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.features.length) {
          const destination = data.features[0].center;
          this.flyToLocation(destination);
          this.drawRoute(destination);
        }
      })
      .catch(err => console.error('Error fetching location:', err));
  }

  selectSuggestion(suggestion: { name: string; center: [number, number] }): void {
    this.searchQuery = suggestion.name;
    this.flyToLocation(suggestion.center);
    this.drawRoute(suggestion.center);
    this.suggestions = [];
  }

  private flyToLocation(center: [number, number]): void {
    this.map?.flyTo({ center, zoom: 14 });
  }

  goBack(): void {
    window.history.back();
  }

  changeMapStyle(styleName: string): void {
    const styleUrl = `https://api.maptiler.com/maps/${styleName}/style.json?key=${this.apiKey}`;
    this.map?.setStyle(styleUrl);
  }

  private async drawRoute(destination: [number, number]): Promise<void> {
    if (!this.userLocation) {
      console.error('User location not available.');
      return;
    }

    const url = `https://api.maptiler.com/navigation/directions/driving/${this.userLocation[0]},${this.userLocation[1]};${destination[0]},${destination[1]}?geometries=geojson&key=9rtSKNwbDOYAoeEEeW9B`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes?.length) {
        console.error('No routes found.');
        return;
      }

      const route = data.routes[0].geometry;
      this.addRoute(route);
    } catch (error) {
      console.error('Error drawing route:', error);
    }
  }

  private addRoute(route: any): void {
    if (!this.map) return;

    // Remove existing route layer/source if they exist
    if (this.map.getLayer(this.routeLayerId)) {
      this.map.removeLayer(this.routeLayerId);
    }
    if (this.map.getSource(this.routeLayerId)) {
      this.map.removeSource(this.routeLayerId);
    }

    this.map.addSource(this.routeLayerId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: route,
            properties: {}
          }
        ]
      }
    });

    this.map.addLayer({
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
