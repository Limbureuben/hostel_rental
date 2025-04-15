import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  private apiUrl = 'http://localhost:8000/api/houses/';
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) { }

  AddHouse(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData)
  }

  getMyHouse() {
    return this.http.get<any[]>(`${this.baseUrl}/api/houses/`);
  }
}
