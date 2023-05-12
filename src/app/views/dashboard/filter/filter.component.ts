import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class USERFilterComponent implements OnInit {

  public modalRef?: BsModalRef;

  @Output() filterEvent = new EventEmitter<{ full_name: string, email: string, street: string, district: string, zip_code: any, description: string, phone: any }>();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  async filter() {
    const full_name = (document.getElementById('full_name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const street = (document.getElementById('street') as HTMLInputElement).value;
    const district = (document.getElementById('district') as HTMLInputElement).value;
    const zip_code = (document.getElementById('zip_code') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    this.filterEvent.emit({ full_name, email, street, district, zip_code, description, phone });
    this.filterEvent.closed
    this.modalService.hide();
  }

  close() {
    this.modalService.hide();
  }
}
