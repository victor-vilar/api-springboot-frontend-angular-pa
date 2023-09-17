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

  statusStyle(contract:Contract){
    let object:any;
    object.textAlign="center";

    //if contract status it is 'ATIVO'
    if(contract.contractStatus.toString() === "ATIVO"){
      object = {backgroundColor:'#D5F5E3',color:'#28dcb8'};
    }

    //if contract status is 'PENDENTE_RENOVAÇÃO'





    return object;
  }

}
