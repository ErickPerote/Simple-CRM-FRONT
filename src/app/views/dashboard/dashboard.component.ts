import { CepInterface } from './../../interface/Cep';
import { ClientInterface } from './../../interface/Client';
import { ClientService } from './../../services/Cliente.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientEditModalComponent } from 'src/app/components/client-edit-modal/client-edit-modal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public modalRef?: BsModalRef;
  public zipCode?: number;
  public street?: string;
  public district?: string;
  public locality?: string;
  public phone?: string;

  public form = new FormGroup({
    zipCode: new FormControl(''),
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
    private modalService: BsModalService,
    public route: Router,
    private routes: ActivatedRoute,
    private authService: AuthenticationService,
    private ClientService: ClientService,
  ) { }

  list?: ClientInterface[]
  client!:  ClientInterface

  async ngOnInit() {
    this.list = await this.ClientService.list()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: false,
        keyboard: false
      });  }


  async onSubmit() {
    console.log(this.form);
    
    if (this.form.valid) {
      try {
        await this.ClientService.createClient(this.form.value)
        this.route.navigate(["/dashboard"])
      } catch (error) {
        console.log(error)
      }
    } else {
      this.formValid = true
    }
    await this.ngOnInit()

    
  }


  openEditModel(client: ClientInterface) {
    this.modalRef = this.modalService.show(ClientEditModalComponent, {
      initialState: { client_id: client.id },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: false,
      keyboard: false
    });
  }

  logout() {
    this.authService.logout()
    this.route.navigate([""])
  }



  async findZipCode(value: number) {
    if(String(value).length == 8) {

      let address = await this.ClientService.cep(value);
      this.form.controls['street'].setValue(address.logradouro);
      this.form.controls['district'].setValue(address.bairro);
      this.form.controls['locality'].setValue(address.localidade);
      this.form.controls['phone'].setValue(address.ddd);

      console.log(this.form.value)
      console.log(this.form)
      //console.log(address)
    }
  }
    /*
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
 */
}

