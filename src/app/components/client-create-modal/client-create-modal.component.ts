import { CepInterface } from './../../interface/Cep';
import { ClientInterface } from './../../interface/Client';
import { ClientService } from './../../services/Cliente.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {  Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-client-create-modal',
  templateUrl: './client-create-modal.component.html',
  styleUrls: ['./client-create-modal.component.css']
})
export class ClientCreateModalComponent implements OnInit {
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

  formValid: boolean = false

  constructor(
    public route: Router,
    private ClientService: ClientService,
  ) { }

  list?: ClientInterface[]
  client!: ClientInterface

  async ngOnInit() {
  }


  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.ClientService.createClient(this.form.value)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    } else {
      this.formValid = true
    }
    await this.ngOnInit()


  }

  async findZipCode(value: number) {
    if (String(value).length == 8) {

      let address = await this.ClientService.cep(value);
      this.form.controls['street'].setValue(address.logradouro);
      this.form.controls['district'].setValue(address.bairro);
      this.form.controls['locality'].setValue(address.localidade);
      this.form.controls['phone'].setValue(address.ddd);
      console.log(this.form.value)
      console.log(this.form)

    }
  }

}
