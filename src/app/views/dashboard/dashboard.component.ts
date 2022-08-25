import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ICep } from 'src/app/interface/Cep';
import { CEPService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public modalRef?: BsModalRef;

  cepForm = new FormGroup({
    cep: new FormControl(),
    street: new FormControl(),
    district: new FormControl(),
    locality: new FormControl(),
    description: new FormControl(),
    phone: new FormControl()
  })


    constructor(private cepService: CEPService, private modalService: BsModalService, public route: Router, ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  async ngOnInit() {
    await this.findByCep('')

  }

 /* public async onSubmit(): Promise<void>{
    if(this.cepForm.valid) {
      try {
        let response = await this.cepService.informationsCep(this.cepForm.value)
        this.cepService.informationsCep(response)
        this.route.navigate(['/dashboard'])
      } catch (error) {
        console.log(error)
      }
    }
  }*/

   async findByCep(cep: string): Promise<void> {
    await this.cepService.findByCep(cep)
    console.log(cep)

}

}
