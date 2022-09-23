import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientInterface } from 'src/app/interface/Client';
import { ClientService } from 'src/app/services/Cliente.service';

@Component({
  selector: 'app-client-edit-modal',
  templateUrl: './client-edit-modal.component.html',
  styleUrls: ['./client-edit-modal.component.css']
})
export class ClientEditModalComponent implements OnInit {
  public modalRef?: BsModalRef;

  public zip_code?: number;
  public street?: string;
  public district?: string;
  public locality?: string;
  public phone?: string;

  public form = new FormGroup({
    zip_code: new FormControl(),
    full_name: new FormControl(),
    email: new FormControl(),
    street: new FormControl(),
    district: new FormControl(),
    locality: new FormControl(),
    description: new FormControl(),
    phone: new FormControl(),
  })


  client: ClientInterface ={
    description: '',
    email: '',
    full_name: '',
    street: '',
    district: '',
    locality: '',
    phone: '',
    zip_code: 0
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
    window.location.reload()
  }

  async findZipCode(value: number) {
    if (String(value).length == 8) {

      let address = await this.clientService.cep(value);
      this.form.controls['street'].setValue(address.logradouro);
      this.form.controls['district'].setValue(address.bairro);
      this.form.controls['locality'].setValue(address.localidade);
      this.form.controls['phone'].setValue(address.ddd);
      console.log(this.locality)
      console.log(this.street)

    }
  }

}
