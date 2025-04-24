import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private baseUrl = 'http://127.0.0.1:8000';
  private apiUrl = 'http://localhost:8000/api/upload-signed-agreement/';

  constructor(
    private http: HttpClient
  ) { }

  getAllHouse() {
    return this.http.get<any[]>(`${this.baseUrl}/api/houses/`);
  }

  bookRoom(houseId: number): void {
    this.http.post(`${this.baseUrl}/api/book/`, { house_id: houseId }, { responseType: 'blob' })
      .subscribe((res: Blob) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'rental_agreement.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }



  uploadAgreement(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
