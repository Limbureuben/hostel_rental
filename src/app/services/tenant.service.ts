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
}
