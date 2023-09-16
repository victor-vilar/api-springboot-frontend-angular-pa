import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';
import { CustomerAddressListTableComponentMapperService } from '../customer-address-list-table-component-mapper-service.service';

@Component({
  selector: 'app-customer-addresses-list-table',
  templateUrl: './customer-addresses-list-table.component.html',
  styleUrls: ['./customer-addresses-list-table.component.css']
})
export class CustomerAddressesListTableComponent extends ItensTableComponent implements OnInit {

  constructor(router:Router,mapper:CustomerAddressListTableComponentMapperService,dialogService:DialogServiceService){
    super(router,dialogService)
  }

  ngOnInit(): void {
    let observable$ = this.service.refreshAllData();
    observable$.subscribe(this.onInitObserver())
    this.getAll();
  }

}
