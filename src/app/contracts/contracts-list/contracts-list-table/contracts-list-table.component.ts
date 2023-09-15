import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-contracts-list-table',
  templateUrl: './contracts-list-table.component.html',
  styleUrls: ['./contracts-list-table.component.css']
})
export class ContractsListTableComponent extends ItensTableComponent implements OnInit {

  constructor(router:Router,
    mapper:MapperService,
    dialogService:DialogServiceService,
    private customerService:CustomerService){
      super(router,mapper,dialogService);
      console.log('comecei em...')
    }


  ngOnInit(): void {
    let observable$ = this.service.refreshAllData();
    observable$.subscribe(this.onInitObserver())
  }

  override updateDataSource(){
    console.log(this.tableData);
    let list = this.tableData.map(e => {
     e.customer = this.customerService.findCustomersByIdInList(e.customerId);
    })

    this.dataSource = new MatTableDataSource(list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
  }

}
