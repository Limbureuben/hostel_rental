import { Component } from '@angular/core';

@Component({
  selector: 'app-user-home',
  standalone: false,
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {

  title = 'House Rental System';
  houses = [
    {
      name: 'Modern Apartment',
      location: 'New York, USA',
      price: '$2000/month',
      image: 'assets/images/house1.jpg'
    },
    {
      name: 'Luxury Villa',
      location: 'Los Angeles, USA',
      price: '$5000/month',
      image: 'assets/images/house2.jpg'
    },
    {
      name: 'Cozy Cottage',
      location: 'Austin, USA',
      price: '$1500/month',
      image: 'assets/images/house3.jpg'
    }
  ];

}
