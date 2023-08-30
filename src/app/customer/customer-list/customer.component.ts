import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { Customer } from 'src/app/shared/entities/Customer';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseComponent } from 'src/app/shared/interfaces/crudbase.interface';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';


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
  objectToEdit:any;

  constructor(service:CustomerService,
    private dialogService:DialogServiceService,
    private route: ActivatedRoute,){
    this.service = service;
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });

    this.headerForTables =['CPF-CNPJ','Nome/Razão Social','Contratos','Enderecos','Fiscais','Opções']

    this.title='Clientes';
    this.pathPrefix='cliente';
    this.pathToOperations = [
        {name:"Cadastrar novo Cliente ", path: this.pathPrefix + '/novo'},
      ];
  }

  //open dialog of detail form
  openDialog(): void {
    this.dialogService.openDialog(CustomerDetailComponent, this.objectToEdit, this.title.toLowerCase());
    this.objectToEdit = null;
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
