import { ClientInterface } from './../../interface/Client';
import { ClientService } from './../../services/Cliente.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
    street: new FormControl(),
    district: new FormControl(),
    locality: new FormControl(),
    description: new FormControl(),
    phone: new FormControl()
  })
  constructor(
    private modalService: BsModalService,
    public route: Router,
    private authService: AuthenticationService,
    private ClientService: ClientService,
  ) { }

  list?: ClientInterface[]

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async ngOnInit() {
    this.list = await this.ClientService.list()
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

  alert() {
    console.log('we')
  }

  logout() {
    this.authService.logout()
    this.route.navigate([""])
  }
}


/* async findByCep(cep: string): Promise<void> {
  await this.LocalizationService.findByCep(cep)
  console.log(cep)
}*/
