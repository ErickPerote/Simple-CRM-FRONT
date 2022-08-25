import { RegisterClientService } from './../../services/RegisterCliente.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalizationService } from 'src/app/services/Loalization.service';
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

  ceps?: string

  constructor(
    private LocalizationService: LocalizationService,
    private modalService: BsModalService,
    public route: Router,
    private authService: AuthenticationService,
    private registerClientService: RegisterClientService,
    ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  async ngOnInit() {
  }


  async onSubmit() {
    if(this.cepForm.valid) {
      try {
        this.registerClientService.createClient(this.cepForm.value)
        this.route.navigate(["/dashboard"])
      } catch (error) {

      }
    }
  }

   async findByCep(cep: string): Promise<void> {
    await this.LocalizationService.findByCep(cep)
    console.log(cep)
  }

  logout() {
    this.authService.logout()
    this.route.navigate([""])
  }

}
