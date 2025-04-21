import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  bookRoom(houseId: number): void {
    this.http.post(`${this.baseUrl}/api/book/`, { house_id: houseId }, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rental_agreement.pdf';
      a.click();
      window.URL.revokeObjectURL(url); // Clean up
    });
  }

}
