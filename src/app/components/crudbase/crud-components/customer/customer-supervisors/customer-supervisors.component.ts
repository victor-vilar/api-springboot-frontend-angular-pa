import { DialogServiceService } from './../../../../../services/dialog-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/Customer';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { CustomerSupervisorsDetailComponent } from './customer-supervisors-detail/customer-supervisors-detail.component';

@Component({
  selector: 'app-customer-supervisors',
  templateUrl: './customer-supervisors.component.html',
  styleUrls: ['./customer-supervisors.component.css']
})
export class CustomerSupervisorsComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    supervisorService:SupervisorService,
    private route:ActivatedRoute,
    private dialogService:DialogServiceService) {
      this.supervisorService = supervisorService;
      this.customerService = customerService;
     }

  selectedCustomer:Customer;
  title='Fiscais'
  pathPrefix='fiscal';
  headerForTables:any;
  pathToOperations = [{name:"Cadastrar novo fiscal", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  supervisorService:SupervisorService;
  objectToEdit;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });



    this.headerForTables ={
      id:'Id',
      name:'Nome',
      phoneNumber:'Telefone',
      email:'Email',
     };

    this.route.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === param.get('cpfCnpj'));
    })

    this.supervisorService.getAll();

  }

  openDialog(){

    this.dialogService.openDialogPassingCustomerId(CustomerSupervisorsDetailComponent,
      this.objectToEdit,
      this.selectedCustomer.cpfCnpj,
      this.pathPrefix);

    this.objectToEdit = null;
  }

  editObject(object:any){
    this.objectToEdit = object;
  }



}
