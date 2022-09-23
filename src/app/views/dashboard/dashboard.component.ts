import { ClientCreateModalComponent } from './../../components/client-create-modal/client-create-modal.component';
import { ClientInterface } from './../../interface/Client';
import { ClientService } from './../../services/Cliente.service';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {  Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientEditModalComponent } from 'src/app/components/client-edit-modal/client-edit-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  public modalRef?: BsModalRef;
  formValid: boolean = false

  constructor(
    private modalService: BsModalService,
    public route: Router,
    private authService: AuthenticationService,
    private ClientService: ClientService,
  ) { }

  list?: ClientInterface[]
  client!:  ClientInterface

  async ngOnInit() {
    this.list = await this.ClientService.list()
  }

  public search(value: ClientInterface | any) {
    this.emmitSearch.emit(value)
  }

  openCreateModal() {
    this.modalRef = this.modalService.show(ClientCreateModalComponent,
      { class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: false,
        keyboard: false
      });
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

  async deleteClient(client: ClientInterface | any) {
    await this.ClientService.deleteClient(client.id);
    window.location.reload()
  }

}

