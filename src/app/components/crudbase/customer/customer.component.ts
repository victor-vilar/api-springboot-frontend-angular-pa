import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { Customer } from 'src/app/util/entities/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseComponent } from '../crud-base.component';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { ResidueDetailComponent } from '../residue/residue-detail/residue-detail.component';
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

  //open dialog of detail form
  openDialog(): void {
    this.dialogService.openDialog(CustomerDetailComponent, this.objectToEdit, this.title.toLowerCase());
    this.objectToEdit = null;
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
