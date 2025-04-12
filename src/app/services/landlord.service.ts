import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  private apiUrl = 'http://localhost:8000/api/houses/';

  constructor(
    private http: HttpClient
  ) { }

  AddHouse(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData)
  }
}
