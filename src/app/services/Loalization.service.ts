import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { localizationInterface } from '../interface/Localization';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private http: HttpClient) { }

  async findByCep(cep: string): Promise<localizationInterface[]> {
    return firstValueFrom(this.http.get<localizationInterface[]>(`https://viacep.com.br/ws/${cep}/json/`))
  }
}
