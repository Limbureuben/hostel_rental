import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { REGISTER_USER } from '../graphql';

export interface RegisterData {
  username: string,
  password: string,
  confirmPassword: string
  role: string
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

}
