import { Subscription } from 'rxjs';
import { CustomerContractsDetailComponent } from '../customer-contracts-detail/customer-contracts-detail.component';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { CustomerContractsService } from 'src/app/customer/services/customerContracts.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/entities/Customer';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { CustomerContractsByCustomerTableMapperService } from './customer-contracts-by-customer-table-mapper.service';
import { CommunicationService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-customer-contracts-by-customer-list',
  templateUrl: './customer-contracts-by-customer-list.component.html',
  styleUrls: ['./customer-contracts-by-customer-list.component.css']
})
export class CustomerContractsByCustomerListComponent implements OnInit, OnDestroy {

  subscriptions:Subscription[] = [];

  constructor(
    customerService:CustomerService,
    contractService:CustomerContractsService,
    mapper:CustomerContractsByCustomerTableMapperService,
    private route:ActivatedRoute,
    private communicationService:CommunicationService,
    private dialogService:DialogServiceService) {
      this.contractService = contractService;
      this.customerService = customerService;
      this.mapper = mapper;
     }
  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  selectedCustomer:Customer;
  title='Contratos'
  pathPrefix='contrato';
  headerForTables:any;
  pathToOperations = [{name:"Cadastrar novo Contrato", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  contractService:CustomerContractsService;
  objectToEdit;
  mapper:CustomerContractsByCustomerTableMapperService;



  ngOnInit(): void {

    console.log('iniciei')
    this.headerForTables = ['Id','Numero','Data-Inicio', 'Data-Fim', 'Total-de-Itens', 'Total-em-R$','Opções'];
    this.route.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj =>obj.cpfCnpj === param.get('cpfCnpj'))
    })


    this.subscriptions.push(
      this.communicationService.dataEmitter.subscribe(value => {
        this.objectToEdit = value
        this.openDialog();
      })
    );


    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });


  }

  openDialog(){

    this.dialogService.openDialogPassingCustomerId(CustomerContractsDetailComponent,
      this.objectToEdit,
      this.selectedCustomer.cpfCnpj,
      '/dashboard',
      "100%",
      "100%");
    this.objectToEdit = null;
  }

  editObject(object:any){
    this.objectToEdit = object;
  }





}
