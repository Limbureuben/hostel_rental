import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-agreement-history',
  standalone: false,
  templateUrl: './agreement-history.component.html',
  styleUrl: './agreement-history.component.scss'
})
export class AgreementHistoryComponent {
  agreements: any[] = [];

  constructor(
    private tenantService: TenantService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getReceivedAgreements();
  }

  getReceivedAgreements() {
    this.tenantService.getReceivedAgreements().subscribe({
      next: (res) => {
        this.agreements = res;
      },
      error: (err) => {
        console.error('Failed to load agreements:', err);
        this.toastr.error('Failed to load agreements.');
      }
    });
  }

  downloadFile(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() ?? 'agreement.pdf'; // Extract filename or use default
    link.click();
  }

}
