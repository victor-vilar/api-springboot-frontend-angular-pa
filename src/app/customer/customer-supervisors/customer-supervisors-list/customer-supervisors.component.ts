import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/entities/Customer';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerSupervisorService } from 'src/app/customer/services/customerSupervisor.service';
import { CustomerSupervisorsDetailComponent } from '../customer-supervisors-detail/customer-supervisors-detail.component';
import { CustomerSupervisorsListTableComponentMapperService } from './customer-supervisors-list-table-component-mapper.service';

@Component({
  selector: 'app-customer-supervisors',
  templateUrl: './customer-supervisors.component.html',
  styleUrls: ['./customer-supervisors.component.css']
})
export class CustomerSupervisorsListComponent implements OnInit {



  selectedCustomer:Customer;
  title='Fiscais'
  pathPrefix='fiscal';
  headerForTables:any;
  pathToOperations = [{name:"Cadastrar novo fiscal", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  supervisorService:CustomerSupervisorService;
  objectToEdit;
  mapper:CustomerSupervisorsListTableComponentMapperService;


  constructor(
    customerService:CustomerService,
    supervisorService:CustomerSupervisorService,
    mapper:CustomerSupervisorsListTableComponentMapperService,
    private route:ActivatedRoute,
    private dialogService:DialogServiceService) {
      this.supervisorService = supervisorService;
      this.customerService = customerService;
      this.mapper = mapper
     }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });



    this.headerForTables =['Id','Nome','Telefone','Email','Opções'];

    this.route.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === param.get('cpfCnpj'));
    })


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
