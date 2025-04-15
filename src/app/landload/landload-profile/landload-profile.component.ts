import { Component } from '@angular/core';
import { LandlordService } from '../../services/landlord.service';

@Component({
  selector: 'app-landload-profile',
  standalone: false,
  templateUrl: './landload-profile.component.html',
  styleUrl: './landload-profile.component.scss'
})
export class LandloadProfileComponent {
  user: any;

  constructor(
    private userService: LandlordService
  ) {}
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Profile fetch error:', err);
      }
    });
  }


}
