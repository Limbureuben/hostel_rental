import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-openstreetmap',
  standalone: false,
  templateUrl: './openstreetmap.component.html',
  styleUrl: './openstreetmap.component.scss'
})
export class OpenstreetmapComponent {
  mapUrl: string = 'https://www.google.com/maps?q=-6.752629,39.210418&output=embed';
  location: any;

  goBack() {
  this.location.back(); // navigates to the previous page
}
}
