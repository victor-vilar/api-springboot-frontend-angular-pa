import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Contract } from 'src/app/shared/entities/Contract';
import { ContractStatus } from 'src/app/shared/enums/ContractStatus';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-contracts-list-table',
  templateUrl: './contracts-list-table.component.html',
  styleUrls: ['./contracts-list-table.component.css']
})
export class ContractsListTableComponent extends ItensTableComponent {

  constructor(router:Router,
    mapper:MapperService,
    dialogService:DialogServiceService,
    private customerService:CustomerService){
      super(router,dialogService);
    }

  override updateDataSource(){
    console.log(this.tableData);
    let list = this.tableData.map(e => {
     e.customer = this.customerService.findCustomersByIdInList(e.customerId);
     return e;
    })
    console.log(list);
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
  }

  statusStyle(contract:Contract){
    let object:any;
    if(contract.contractStatus.toString() === "ATIVO"){
      object = {backgroundColor:'#D5F5E3',color:'green',textAlign:'center'};
    }



    return object;
  }

}
