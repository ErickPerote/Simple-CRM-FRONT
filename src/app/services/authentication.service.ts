import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginInterface, TokenInterface } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(public http: HttpClient) { }

    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return !!token
    }


  async login(user: LoginInterface) : Promise<TokenInterface> {
    return await firstValueFrom(this.http.post<TokenInterface>('http://localhost:3000/login', user))
  }


  storeToken(data: TokenInterface) {
    localStorage.setItem('token', data.token);
  }


  logout() {
    localStorage.clear()
  }
}
