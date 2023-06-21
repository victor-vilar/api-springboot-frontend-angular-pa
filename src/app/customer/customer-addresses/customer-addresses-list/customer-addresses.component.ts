import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerAddressService } from 'src/app/customer/services/customerAddress.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Customer } from 'src/app/shared/entities/Customer';
import { CustomerAddressesDetailComponent } from '../customer-addresses-detail/customer-addresses-detail.component';

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.css']
})
export class CustomerAddressesComponent implements OnInit {

  constructor(
    customerService:CustomerService,
    addressService:CustomerAddressService,
    private route:ActivatedRoute,
    private dialogService:DialogServiceService) {
      this.addressService = addressService;
      this.customerService = customerService;
     }

  selectedCustomer:Customer;
  title='Enderecos'
  pathPrefix='endereco';
  headerForTables:any;
  pathToOperations = [{name:"Cadastrar novo Endereço", path: this.pathPrefix + '/novo', title:"Novo " + this.pathPrefix}];
  customerService:CustomerService;
  addressService:CustomerAddressService;
  objectToEdit;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });


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

    this.route.paramMap.subscribe(param =>{
      this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === param.get('cpfCnpj'));
    })

    this.addressService.getAll();
  }

  openDialog(){

    this.dialogService.openDialogPassingCustomerId(CustomerAddressesDetailComponent,
      this.objectToEdit,
      this.selectedCustomer.cpfCnpj,
      this.pathPrefix);

    this.objectToEdit = null;
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}