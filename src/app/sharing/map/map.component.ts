import { Component,OnInit,ViewChild,ElementRef,AfterViewInit,OnDestroy,Inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  searchQuery: string = '';
  suggestions: any[] = [];
  locationName: string = '';
  selectedSpace: any = null;
  openSpaces: any[] = [];
  emailWarning: boolean = false;
  showConfirmationModal = false;


  message: string = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';
  submitting = false;
  success = false;
  errorMessage = '';
  reportId: string = '';

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
) {}


  ngOnInit(): void {
    config.apiKey = '9rtSKNwbDOYAoeEEeW9B';
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    ;
    }
  }

  initializeMap(): void {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=9rtSKNwbDOYAoeEEeW9B',
      center: [39.230099, -6.774133],
      zoom: 14
    });
  }


  ngOnDestroy() {
    this.map?.remove();
  }

triggerFileInput() {
  document.getElementById('file-upload')?.click();
}


  fetchSuggestions() {
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

  searchLocation() {
    if (!this.searchQuery) return;

    fetch(`https://api.maptiler.com/geocoding/${this.searchQuery}.json?key=9rtSKNwbDOYAoeEEeW9B&country=TZ`)
      .then(res => res.json())
      .then(data => {
        if (data.features.length > 0) {
          const { center } = data.features[0];
          this.map?.flyTo({ center, zoom: 14 });
        }
      })
      .catch(err => console.error("Error fetching location:", err));
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.name;
    this.map?.flyTo({ center: suggestion.center, zoom: 14 });
    this.suggestions = [];
  }

  goBack() {
    window.history.back();
  }

  changeMapStyle(styleName: string) {
    const styleUrl = `https://api.maptiler.com/maps/${styleName}/style.json?key=9rtSKNwbDOYAoeEEeW9B`;
    this.map?.setStyle(styleUrl);
  }


}
