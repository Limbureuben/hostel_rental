import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { LOGIN_USER, REGISTER_USER } from '../graphql';
import { HttpClient } from '@angular/common/http';

export interface RegisterData {
  username: string,
  password: string,
  confirmPassword: string
}

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8000';

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  registerUser(userData: RegisterData): Observable<any> {
    return this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: {
        username: userData.username,
        password: userData.password,
        confirmPassword: userData.confirmPassword,

      }
    })
  }

  loginUser(loginData: LoginData): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables:{
        username: loginData.username,
        password: loginData.password
      }
    })
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/password-reset/`, { email });
  }

  resetPassword(uid: string, token: string, password: string) {
    // Encode the UID to base64
    const encodedUid = btoa(uid);

    // Construct the URL with the base64-encoded UID and token
    const url = `${this.apiUrl}password-reset-confirm/${encodedUid}/${token}/`;
    console.log('Reset Password URL:', url);

    // Make the HTTP POST request to the backend with the new password
    return this.http.post(url, { password });
  }


}
