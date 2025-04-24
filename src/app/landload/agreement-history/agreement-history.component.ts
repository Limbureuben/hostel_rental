import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TenantService } from '../../services/tenant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-agreement-history',
  standalone: false,
  templateUrl: './agreement-history.component.html',
  styleUrl: './agreement-history.component.scss'
})
export class AgreementHistoryComponent {
  displayedColumns: string[] = ['from_user', 'sender_phone', 'uploaded_at', 'file', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  agreements: any[] = [];

  constructor(
    private tenantService: TenantService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getReceivedAgreements();
  }

  getReceivedAgreements() {
    this.tenantService.getReceivedAgreements().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  downloadFile(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() ?? 'agreement.pdf'; // Extract filename or use default
    link.click();
  }

  closeDialog() {
    this.closeDialog();
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
