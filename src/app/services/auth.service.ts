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

  private apiUrl = 'http://localhost:8000/api/password-reset/';

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
    return this.http.post(this.apiUrl, { email });
  }

}
