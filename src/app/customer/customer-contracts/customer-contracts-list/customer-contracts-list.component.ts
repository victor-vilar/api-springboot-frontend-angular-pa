import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerContractsService } from '../../services/customerContracts.service';

@Component({
  selector: 'app-customer-contracts-list',
  templateUrl: './customer-contracts-list.component.html',
  styleUrls: ['./customer-contracts-list.component.css']
})
export class CustomerContractsListComponent implements OnInit {

  headerForTables:string[] = [];
  customerService:CustomerService;
  contractService:CustomerContractsService;
  title = "Contratos"
  objectToEdit:any;

  constructor() { }

  ngOnInit(): void {
    this.headerForTables = ['Id','Cliente','Numero','Data-Inicio', 'Data-Fim', 'Total-de-Itens', 'Total-em-R$','Opções'];
    
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
