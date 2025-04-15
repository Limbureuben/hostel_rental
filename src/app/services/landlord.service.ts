// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LandlordService {

//   private apiUrl = 'http://localhost:8000/api/houses/';
//   private baseUrl = 'http://127.0.0.1:8000';

//   constructor(
//     private http: HttpClient
//   ) { }

//   AddHouse(formData: FormData): Observable<any> {
//     return this.http.post(this.apiUrl, formData)
//   }

//   getMyHouse() {
//     const userId = localStorage.getItem('userId');
//     console.log('User ID:', userId);  // Check if the userId is correct
//     return this.http.get<any[]>(`${this.baseUrl}/api/houses/?user=${userId}`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {
  // Use a single API URL for consistency
  private apiUrl = 'http://localhost:8000/api/houses/';

  constructor(private http: HttpClient) {}

  // Add a new house (sending form data)
  AddHouse(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData); // Token will automatically be added via the interceptor
  }

  // Fetch houses posted by the logged-in user
  getMyHouse(): Observable<any[]> {
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId); // Check if the userId is correct
    return this.http.get<any[]>(`${this.apiUrl}?user=${userId}`); // Token will automatically be added via the interceptor
  }

  getProfile(): Observable<any> {
    return this.http.get('http://localhost:8000/api/profile/');
  }

}
