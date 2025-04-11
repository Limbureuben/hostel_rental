import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-house-history',
  standalone: false,
  templateUrl: './house-history.component.html',
  styleUrl: './house-history.component.scss'
})
export class HouseHistoryComponent {
  showHouseReport = true;

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {

  }

}
