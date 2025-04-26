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
          const feature = data.features[0];
          const destination = feature.center as [number, number];

          this.flyToLocation(destination);

          if (this.userLocation) {
            this.drawRoute(destination);
          } else {
            console.error('User location not available, cannot draw route.');
          }
        } else {
          console.error('No location found for search.');
        }
      })
      .catch(err => console.error('Error fetching location:', err));
  }

  selectSuggestion(suggestion: { name: string; center: [number, number] }): void {
    this.searchQuery = suggestion.name;
    const destination = suggestion.center;

    this.flyToLocation(destination);

    if (this.userLocation) {
      this.drawRoute(destination);
    } else {
      console.error('User location not available, cannot draw route.');
    }

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

    const openRouteApiKey = '5b3ce3597851110001cf6248e536cc2e38174bc0b11de4674f25c7e5'; // OpenRouteService API key

    const url = 'https://api.openrouteservice.org/v2/directions/driving-car?geometry_format=geojson';

    const body = {
      coordinates: [
        [this.userLocation[1], this.userLocation[0]], // Swap to [longitude, latitude]
        [destination[1], destination[0]]              // Swap to [longitude, latitude]
      ]
    };

    console.log('User Location:', this.userLocation);
    console.log('Destination:', destination);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': openRouteApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      console.log('OpenRouteService Response:', data);

      if (!data.routes || data.routes.length === 0) {
        console.error('No routes found. Please try different locations.');
        return;
      }

      const geojsonRoute = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: data.routes[0].geometry,
            properties: {}
          }
        ]
      };

      this.addRoute(geojsonRoute);

    } catch (error) {
      console.error('Error fetching route from OpenRouteService:', error);
    }
  }


  private addRoute(routeData: any): void {
    if (!this.map) return;

    if (this.map.getLayer(this.routeLayerId)) {
      this.map.removeLayer(this.routeLayerId);
    }
    if (this.map.getSource(this.routeLayerId)) {
      this.map.removeSource(this.routeLayerId);
    }

    this.map.addSource(this.routeLayerId, {
      type: 'geojson',
      data: routeData
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
