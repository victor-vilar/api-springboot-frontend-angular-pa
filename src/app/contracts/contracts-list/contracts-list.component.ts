import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer/services/customer.service';
import { CustomerContractsService } from '../../customer/services/customerContracts.service';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(customerService:CustomerService,
    contractService:CustomerContractsService,
    private route:ActivatedRoute,
    private dialogService:DialogServiceService) {
      this.contractService = contractService
    }

  ngOnInit(): void {
    this.headerForTables = ['Id','Cliente','Numero','Data-Inicio', 'Data-Fim', 'Total-em-R$','Opções'];
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
