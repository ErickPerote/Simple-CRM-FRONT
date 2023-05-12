import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {  Router } from '@angular/router';
import { ClientService } from 'src/app/services/Cliente.service';
import { ClientInterface } from 'src/app/interface/Client';
import { ClientCreateModalComponent } from 'src/app/components/client-create-modal/client-create-modal.component';
import { ClientEditModalComponent } from 'src/app/components/client-edit-modal/client-edit-modal.component';
import { USERFilterComponent } from '../filter/filter.component';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;

  public modalRef?: BsModalRef;
  data: any = { data: [], total: 0 };  client!:  ClientInterface
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    previousPageIndex: 0
  };
  searchParams: { full_name: string, email: string, street: string, district: string, zip_code: any, description: string,  phone: any,  };


  constructor(
    private modalService: BsModalService,
    public route: Router,
    private dialogModel: MatDialog,
    private ClientService: ClientService,
  ) { 
    this.searchParams = { full_name: '', email: '', street: '', district: '', zip_code: '', description: '', phone: '' }
  }

  page = 0
  endPage = 0

  async ngOnInit() {
    const limit = 10;
    const page = 0;
    const name = this.searchParams.full_name
    const email = this.searchParams.email
    const street = this.searchParams.street
    const district = this.searchParams.district
    const zip_code = this.searchParams.zip_code
    const description = this.searchParams.description
    const phone = this.searchParams.phone

    this.data = await this.ClientService.list(limit, page, name, email, street, district, zip_code, description, phone)

    this.paginator.length = this.data.total;
    this.paginator.pageSize = limit;
    this.paginator.pageIndex = page;

    this.list(this.pageEvent)

  }

  async list(event: any) {
    const limit = event.pageSize;
    const page = event.pageIndex  
    const name = this.searchParams.full_name
    const email = this.searchParams.email
    const street = this.searchParams.street
    const district = this.searchParams.district
    const zip_code = this.searchParams.zip_code
    const description = this.searchParams.description
    const phone = this.searchParams.phone

    this.data = await this.ClientService.list(limit, page, name, email, street, district, zip_code, description, phone)

    this.paginator.length = this.data.total;
  }

  Filter() {
    this.modalRef = this.modalService.show(USERFilterComponent);
    this.modalRef.content?.filterEvent.subscribe((values: any) => {
      this.searchParams = values
      this.ngOnInit()
    });
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

  async deleteClient(client: ClientInterface | any) {
    await this.ClientService.deleteClient(client.id);
    window.location.reload()
  }

}


