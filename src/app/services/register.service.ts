
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface, TokenInterface, User } from '../interface/User';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }


  public createUser(user: RegisterInterface) : Promise<TokenInterface> {
    return firstValueFrom(this.http.post<TokenInterface>('http://localhost:3000/register', user));
  }

}
