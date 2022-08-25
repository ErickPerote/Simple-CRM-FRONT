import { localizationInterface } from 'src/app/interface/Localization';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface, TokenInterface, User } from '../interface/User';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class RegisterClientService {

  constructor(public http: HttpClient) { }

  public createClient(client: localizationInterface) : Promise<localizationInterface[]> {
    return firstValueFrom(this.http.post<localizationInterface[]>('http://localhost:3000/client', client));
  }


}
