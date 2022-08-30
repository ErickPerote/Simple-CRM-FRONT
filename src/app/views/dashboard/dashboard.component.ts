import { CepInterface } from './../../interface/Cep';
import { JsonPipe } from '@angular/common';
import { ClientInterface } from './../../interface/Client';
import { ClientService } from './../../services/Cliente.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public modalRef?: BsModalRef;

  cepForm = new FormGroup({
    full_name: new FormControl(),
    email: new FormControl(),
    description: new FormControl(),
  })
  constructor(
    private modalService: BsModalService,
    public route: Router,
    private authService: AuthenticationService,
    private ClientService: ClientService,
  ) { }

  list?: ClientInterface[]

  async ngOnInit() {
    this.list = await this.ClientService.list()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async onSubmit() {
    if (this.cepForm.valid) {
      try {
        await this.ClientService.createClient(this.cepForm.value)
        this.route.navigate(["/dashboard"])
      } catch (error) {
        console.log(error)
      }
    }
    await this.ngOnInit()
  }

  logout() {
    this.authService.logout()
    this.route.navigate([""])
  }

  searchCep(cep: string) {
    cep = cep.replace(/\D/g, '')
    if(cep != '') {
      const cepValid = /^[0-9]{8}$/;

      if(cepValid.test(cep)) {
        this.ClientService.cep(cep).then((data) => this.FormFunc(data, ''))
      }else {
        console.log('deu ruim')
      }
    }
  }

  FormFunc(data: string | any, form: any) {
    form.setValue({
      rua: data.rua,
      bairro: data.bairro,
      UF: data.localidade,
      ddd: data.ddd,
      cep: data.cep
    })

  }

}

