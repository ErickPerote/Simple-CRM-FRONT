import { ClientInterface } from './../interface/Client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) { }

  url = 'http://localhost:3000/'

  public async list(): Promise<ClientInterface[]>{
    return firstValueFrom(this.http.get<ClientInterface[]>(`${this.url}client`))
  }

  public async readById(id: number | any): Promise<ClientInterface>{
    return firstValueFrom(this.http.get<ClientInterface>(`${this.url}client/` + id))
  }

  public createClient(client: ClientInterface) : Promise<ClientInterface> {
    return firstValueFrom(this.http.post<ClientInterface>(`${this.url}client`, client));
  }

  async deleteClient(id: number) {
    return firstValueFrom(this.http.delete(`${this.url}client/` + id))
  }

  async updateClient(editClient: ClientInterface, id: number) {
    console.log(`${this.url}client/${id}`)
    return firstValueFrom(this.http.put<ClientInterface>(`${this.url}client/`+ id , editClient))
  }

}
