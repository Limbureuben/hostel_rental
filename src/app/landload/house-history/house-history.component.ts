import { LandlordService } from './../../services/landlord.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-house-history',
  standalone: false,
  templateUrl: './house-history.component.html',
  styleUrl: './house-history.component.scss',
  animations: [
    // Table Pop-up Animation
    trigger('popupAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ]),

    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HouseHistoryComponent {
  displayedColumns: string[] = ['house_type', 'availability_date', 'price_per_month', 'location', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private landloadservice: LandlordService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
      this.loadhouse();
  }

  loadhouse() {
    this.landloadservice.getMyHouse().subscribe({
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

  onView(house: any) {
    console.log('View clicked:', house);
    // You can open a dialog or navigate to a detail page here
  }


  onDelete(houseId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the house!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.landloadservice.deleteHouse(houseId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'House has been deleted.', 'success');
            this.loadhouse(); // Re-fetch list after deletion
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire('Error', 'Failed to delete the house.', 'error');
          }
        });
      }
    });
  }

}

