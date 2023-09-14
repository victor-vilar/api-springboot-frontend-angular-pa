import { CustomerContractsDetailComponent } from '../customer-contracts-detail/customer-contracts-detail.component';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { CustomerContractsService } from 'src/app/customer/services/customerContracts.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/entities/Customer';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';

@Component({
  selector: 'app-customer-contracts-list-per-customer-table',
  templateUrl: './customer-contracts-list-per-customer.component.html',
  styleUrls: ['./customer-contracts-list-per-customer.component.css']
})
export class CustomerContractsListPerCustomerComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    contractService:CustomerContractsService,
    private route:ActivatedRoute,
    private dialogService:DialogServiceService) {
      this.contractService = contractService;
      this.customerService = customerService;
     }

  selectedCustomer:Customer;
  title='Contratos'
  pathPrefix='contrato';
  headerForTables:any;
  pathToOperations = [{name:"Cadastrar novo Contrato", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  contractService:CustomerContractsService;
  objectToEdit;



  ngOnInit(): void {


    console.log(this.contractService);

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });

    this.headerForTables = ['Id','Numero','Data-Inicio', 'Data-Fim', 'Total-de-Itens', 'Total-em-R$','Opções'];

    this.route.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj =>obj.cpfCnpj === param.get('cpfCnpj'))
    })





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
