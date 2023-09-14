import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerContractsService } from '../../services/customerContracts.service';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-contracts-list',
  templateUrl: './customer-contracts-list.component.html',
  styleUrls: ['./customer-contracts-list.component.css']
})
export class CustomerContractsListComponent implements OnInit {

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
    this.headerForTables = ['Id','Cliente','Numero','Data-Inicio', 'Data-Fim', 'Total-de-Itens', 'Total-em-R$','Opções'];
    console.log(this.contractService);
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
