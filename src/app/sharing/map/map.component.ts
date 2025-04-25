import { Component,OnInit,ViewChild,ElementRef,AfterViewInit,OnDestroy,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  isBrowser: boolean;

  @ViewChild('map', { static: false })
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      config.apiKey = '9rtSKNwbDOYAoeEEeW9B';
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      });

      new Marker({ color: '#FF0000' })
        .setLngLat([139.7525, 35.6846])
        .addTo(this.map);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.map?.remove();
    }
  }
}

