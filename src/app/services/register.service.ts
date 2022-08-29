
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface, TokenInterface } from '../interface/User';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token
  }

  public createUser(user: RegisterInterface) : Promise<TokenInterface> {
    return firstValueFrom(this.http.post<TokenInterface>('http://localhost:3000/register', user));
  }

  storeToken(data: TokenInterface| any) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expirationTime', data.expirationTime);
  }

}
