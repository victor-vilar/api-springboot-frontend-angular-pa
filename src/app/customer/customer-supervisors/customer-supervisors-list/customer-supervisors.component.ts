import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/entities/Customer';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerSupervisorService } from 'src/app/customer/services/customerSupervisor.service';
import { CustomerSupervisorsDetailComponent } from '../customer-supervisors-detail/customer-supervisors-detail.component';

@Component({
  selector: 'app-customer-supervisors',
  templateUrl: './customer-supervisors.component.html',
  styleUrls: ['./customer-supervisors.component.css']
})
export class CustomerSupervisorsComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    supervisorService:CustomerSupervisorService,
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
  supervisorService:CustomerSupervisorService;
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