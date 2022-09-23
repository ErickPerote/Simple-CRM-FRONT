import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginInterface, TokenInterface } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwtHelper: any;

  constructor(public http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token
  }

  async login(user: LoginInterface) : Promise<TokenInterface> {
    return await firstValueFrom(this.http.post<TokenInterface>('http://localhost:3000/login', user))
  }

  storeToken(data: TokenInterface ) {
    localStorage.setItem('access_token', data.access_token);
  }

  getToken() {
    const token = localStorage.getItem('access_token');
    return token
  }

  logout() {
    localStorage.clear()
  }

}
