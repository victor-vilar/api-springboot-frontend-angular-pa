import { ActivatedRoute } from '@angular/router';
import { AddressService } from './../../../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/model/Customer';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.css']
})
export class CustomerAddressesComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    addressService:AddressService,
    private activeRoute:ActivatedRoute) {
      this.addressService = addressService;
      this.customerService = customerService;
     }

  selectedCustomer:Customer;
  title='Enderecos'
  pathPrefix='endereco';
  headerForTables:any;
  pathToOperations = [{name:"+", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  addressService:AddressService;

  ngOnInit(): void {
    this.headerForTables ={
      id:'Id',
      addressName:'Logradouro',
      addressNumber:'Número',
      complement:'Complemento',
      zipCode:'CEP',
      city:'Cidade',
      state:'Estado',
      requiresCollection:'Existe Coleta'
     };

    this.activeRoute.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === param.get('cpfCnpj'));
    })
  }




}
