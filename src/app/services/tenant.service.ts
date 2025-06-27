import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) { }

  getAllHouse() {
    return this.http.get<any[]>(`${this.baseUrl}/api/houses/`);
  }

  bookRoom(houseId: number): Observable<void> {
    return this.http.post(`${this.baseUrl}/api/book/`, { house_id: houseId }, { responseType: 'blob' }).pipe(
      tap((res: Blob) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'rental_agreement.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }),
      map(() => void 0) // Return void instead of Blob
    );
  }


  uploadAgreement(data: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/api/agreement/`, data, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    });
  }


  getReceivedAgreements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/received-agreements/`);
  }

  getTotalUsers() {
    return this.http.get<{ total_users: number }>(`${this.baseUrl}/api/user-count/`);
  }

  getHouseTotal() {
    return this.http.get<{ total_houses: number }>(`${this.baseUrl}/api/house-count`)
  }

}
