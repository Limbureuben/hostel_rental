import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo
  ) { }

  registerUser() {
    
  }

}
