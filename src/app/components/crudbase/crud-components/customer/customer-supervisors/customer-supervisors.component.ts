import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/Customer';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-customer-supervisors',
  templateUrl: './customer-supervisors.component.html',
  styleUrls: ['./customer-supervisors.component.css']
})
export class CustomerSupervisorsComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    supervisorService:SupervisorService,
    private activeRoute:ActivatedRoute) {
      this.supervisorService = supervisorService;
      this.customerService = customerService;
     }

  selectedCustomer:Customer;
  title='Fiscais'
  pathPrefix='fiscais';
  headerForTables:any;
  pathToOperations = [{name:"+", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  supervisorService:SupervisorService;

  ngOnInit(): void {
    this.headerForTables ={
      id:'Id',
      name:'Nome',
      phoneNumber:'Telefone',
      email:'Email',
     };

    this.activeRoute.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === param.get('cpfCnpj'));
    })
  }

}
