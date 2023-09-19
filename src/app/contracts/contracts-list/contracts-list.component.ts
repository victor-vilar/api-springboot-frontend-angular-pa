import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer/services/customer.service';
import { CustomerContractsService } from '../../customer/services/customerContracts.service';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';
import { ContractsListTableComponentMapperService } from './contracts-list-table-component-mapper.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit {

  headerForTables:string[] = [];
  contractService:CustomerContractsService;
  title = "Contratos"
  objectToEdit:any;
  mapper:ContractsListTableComponentMapperService;

  constructor(customerService:CustomerService,
    contractService:CustomerContractsService,
    private route:ActivatedRoute,
    private dialogService:DialogServiceService,
    mapper:ContractsListTableComponentMapperService) {
      this.contractService = contractService
      this.mapper = mapper;
    }

  ngOnInit(): void {
    this.headerForTables = ['Id','Cliente','Numero','Data-Inicio', 'Data-Fim', 'Total-em-R$','Status','Opções'];
  }




}
