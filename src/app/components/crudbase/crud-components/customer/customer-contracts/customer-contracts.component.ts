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
  pathPrefix='contrato';
  headerForTables:any;
  pathToOperations = [{name:"+", path: this.pathPrefix + '/novo', title:"Novo Contrato"}];
  customerService:CustomerService;
  contractService:ContractsService;

     /**
      * NO MOMENTO ESTA PUXANDO TODOS OS CONTRATOS, SO QUE ESSA TELA PRECISA MOSTRAR,
      * SOMENTE OS CONTRATOS CADASTRADOS PARA O CLIENTE SELECIONADO
      */

  ngOnInit(): void {

    this.headerForTables ={
      id:'Id',
      number:'Número',
      beginDate:'Data Início',
      endDate:'Data Fim',
      totalItens:'Total de Itens',
      totalEmRs:'Total em R$'
     };
    this.activeRoute.paramMap.subscribe(param =>{
      console.log(param.get('cpfCnpj'));
      console.log(this.customerService.list.length);
      this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === param.get('cpfCnpj'));
    })


  }


}
