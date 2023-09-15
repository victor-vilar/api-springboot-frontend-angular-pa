import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-customer-contracts-list-per-customer-table',
  templateUrl: './customer-contracts-list-per-customer-table.component.html',
  styleUrls: ['./customer-contracts-list-per-customer-table.component.css']
})
export class CustomerContractsByCustomerListTableComponent extends ItensTableComponent implements OnInit {

  constructor(router:Router,
    mapper:MapperService,
    dialogService:DialogServiceService){
    super(router,mapper,dialogService)
}

ngOnInit(): void {
  let observable$ = this.service.refreshAllData();
  observable$.subscribe(this.onInitObserver())
}


}
