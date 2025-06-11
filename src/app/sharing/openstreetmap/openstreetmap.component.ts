import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-openstreetmap',
  standalone: false,
  templateUrl: './openstreetmap.component.html',
  styleUrl: './openstreetmap.component.scss'
})
export class OpenstreetmapComponent {
  // mapUrl: string = 'https://www.google.com/maps?q=27.7172,85.3240&output=embed';
  // mapUrl: string = 'https://www.google.com/maps/dir//Ardhi+University+Tanzania+66M8%2BG6G+University+vimweta+new+building+Dar+es+Salaam/@-6.7664795,39.2138512,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x185c4ef582b1d3fb:0x9e959f2f92ce2aba!2m2!1d39.2138512!2d-6.7664795?entry=ttu&g_ep=EgoyMDI1MDYwOS4wIKXMDSoASAFQAw%3D%3D'
  mapUrl: string = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.646122913417!2d39.2138512!3d-6.7664795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4ef582b1d3fb%3A0x9e959f2f92ce2aba!2sArdhi%20University%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1718027258699';


}
