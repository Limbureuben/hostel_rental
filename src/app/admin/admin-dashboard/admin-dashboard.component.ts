import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  animations: [
    trigger('cardStagger', [
      transition(':enter', [
        query('.dashboard-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;

  constructor(
    private tenantservice: TenantService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.tenantservice.getTotalUsers().subscribe({
      next: (response) => {
        this.totalUsers = response.total_users;
        console.log('Total users:', this.totalUsers);
      },
      error: (error) => {
        console.error('Error fetching total users:', error);
        this.toastr.error('Failed to fetch total users');
      }
    })
  }


}
