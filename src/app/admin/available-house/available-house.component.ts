import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-available-house',
  standalone: false,
  templateUrl: './available-house.component.html',
  styleUrl: './available-house.component.scss',
  animations: [
    // Slide table from right when opening
    trigger('tableEnterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),

    // Animate row additions & deletions
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class AvailableHouseComponent implements OnInit{
  // houses: any[] = [];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private tenantservice: TenantService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.loadhouse();
  }

  loadhouse() {
    this.tenantservice.getAllHouse().subscribe({
      next:(data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error('Failed to fetch houses', 'Error');
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
