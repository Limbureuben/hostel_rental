import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { LOGIN_USER, REGISTER_USER } from '../graphql';

export interface RegisterData {
  username: string,
  password: string,
  confirmPassword: string
  role: string
}

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private apollo: Apollo
  ) { }

  registerUser(userData: RegisterData): Observable<any> {
    return this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: {
        username: userData.username,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        role: userData.role,

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

}
