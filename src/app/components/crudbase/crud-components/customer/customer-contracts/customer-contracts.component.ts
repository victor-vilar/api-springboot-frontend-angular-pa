import { CustomerService } from './../../../../../services/customer.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customer-contracts',
  templateUrl: './customer-contracts.component.html',
  styleUrls: ['./customer-contracts.component.css']
})
export class CustomerContractsComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    contractService:ContractsService,
    private activeRoute:ActivatedRoute) {
      this.contractService = contractService;
      this.customerService = customerService;
     }

  selectedCustomer:Customer;
  title='Contratos'
  pathPrefix='teste';
  headerForTables = ['Id','Número','Data Início', 'Data Fim', 'Total de Itens', 'Total em R$']
  pathToOperations = [];
  customerService:CustomerService;
  contractService:ContractsService;



  ngOnInit(): void {


      //===CODIGO UTILIZADO SOMENTE EM DESENVOLVIMENTO
      this.customerService.refreshAllData()
      .subscribe(value =>{
        console.log(value);
        this.activeRoute.paramMap.subscribe(e =>{
        this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === e.get('cpfCnpj'))})}
        );
        //============================================



      //this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === e.get('cpfCnpj'))})
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.customerService.getAll();
  }


}
