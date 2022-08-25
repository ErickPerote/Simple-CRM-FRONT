import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ICep } from '../interface/Cep';

@Injectable({
  providedIn: 'root'
})
export class CEPService {

  constructor(private http: HttpClient) { }

  async findByCep(cep: string): Promise<ICep[]> {
    return firstValueFrom(this.http.get<ICep[]>(`https://viacep.com.br/ws/${cep}/json/`))
  }
}
