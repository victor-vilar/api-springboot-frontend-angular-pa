import { Customer } from './../../../../model/Customer';
import { CustomerService } from './../../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseComponent } from '../../crud-base.component';


@Component({
  selector: 'app-client',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, CrudBaseComponent {


  title: string;
  pathPrefix: string;
  pathToOperations: any;
  headerForTables: any;
  service:CustomerService;

  constructor(service:CustomerService){
    this.service = service;
  }
  ngOnInit(): void {

    this.headerForTables ={
      cpfCnpj:'CPF/CNPJ',
      nameCompanyName:'Nome/Razão Social',
      contractsSize:'Total de Contratos',
      supervisorsSize:'Total de Fiscais',
      adressesSize:'Total de Endereços',
     };

    this.title='Clientes';
    this.pathPrefix='cliente';
    this.pathToOperations = [
        {name:"Cadastrar novo Cliente ", path: this.pathPrefix + '/novo'},
      ];
  }

}
