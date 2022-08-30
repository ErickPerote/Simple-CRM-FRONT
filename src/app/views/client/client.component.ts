import { ClientInterface } from './../../interface/Client';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/Cliente.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

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


  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private routeUrl: Router
    ) { }

  async ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.client = await this.clientService.readById(id)
  }

  async deleteClient(client: ClientInterface | any) {
    await this.clientService.deleteClient(client.id);
    this.routeUrl.navigate(['dashboard'])
  }


  async updateClient(): Promise<void> {
    let id = this.route.snapshot.params['id']
    await this.clientService.updateClient(this.client, id);
    this.routeUrl.navigate(['dashboard'])
  }

}
