import { Component, OnInit } from '@angular/core';
import { ClientInterface } from 'src/app/interface/Client';
import { ClientService } from 'src/app/services/Cliente.service';

@Component({
  selector: 'app-client-edit-modal',
  templateUrl: './client-edit-modal.component.html',
  styleUrls: ['./client-edit-modal.component.css']
})
export class ClientEditModalComponent implements OnInit {


  client: ClientInterface ={
    description: '',
    email: '',
    full_name: '',
    street: '',
    district: '',
    locality: '',
    phone: '',
    cep: ''
  }

  client_id?: number;

  constructor(
    private clientService: ClientService
    ) { }

    async ngOnInit() {
      this.client = await this.clientService.readById(this.client_id)
    }
  


  async updateClient(): Promise<void> {
    await this.clientService.updateClient(this.client, this.client_id);
  }

}
