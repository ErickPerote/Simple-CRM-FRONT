import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
    private clientService: ClientService,
    private modalService: BsModalService,
    ) { }

    async ngOnInit() {
      this.client = await this.clientService.readById(this.client_id)

      this.form.patchValue({
        zip_code: this.client.zip_code,
        full_name: this.client.full_name,
        email: this.client.email,
        street: this.client.street,
        district: this.client.district,
        locality: this.client.locality,
        description: this.client.description,
        phone: this.client.phone, 
      })
    }

  async updateClient() {
    if(this.form.valid) {
      try {
        await this.clientService.updateClient(this.form.value, this.client_id);
        this.modalService.hide()
      } catch (error) {
        console.log(error)
      }
    }
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
