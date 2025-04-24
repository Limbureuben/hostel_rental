import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TenantService } from '../../services/tenant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

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
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getReceivedAgreements();
  }

  getReceivedAgreements() {
    this.tenantService.getReceivedAgreements().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  downloadFile(fileUrl: string) {
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = fileUrl.split('/').pop() || 'agreement.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
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
