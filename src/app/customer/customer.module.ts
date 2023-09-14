import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddressesListComponent } from './customer-addresses/customer-addresses-list/customer-addresses.component';
import { CustomerAddressesDetailComponent } from './customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerContractsDetailComponent } from './customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { CustomerSupervisorsListComponent } from './customer-supervisors/customer-supervisors-list/customer-supervisors.component';
import { CustomerSupervisorsDetailComponent } from './customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CustomerListComponent } from './customer-list/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerInfoComponent } from './customer-util/customer-info/customer-info.component';
import { CustomerListTableComponent } from './customer-list/customer-list-table/customer-list-table.component';
import { ItemContractListTableComponent } from './customer-util/itemContract-list-table/itemContract-list-table.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MaterialModuleModule } from '../shared/material-module.module';
import { CustomerAddressesListTableComponent } from './customer-addresses/customer-addresses-list/customer-addresses-list-table/customer-addresses-list-table.component';
import { CustomerContractsListPerCustomerTableComponent } from './customer-contracts/customer-contracts-list-per-customer/customer-contracts-list-per-customer-table/customer-contracts-list-per-customer-table.component';
import { CustomerSupervisorsListTableComponent } from './customer-supervisors/customer-supervisors-list/customer-supervisors-list-table/customer-supervisors-list-table.component';
import { CustomerDetailInfoComponent } from './customer-detail/customer-detail-info/customer-detail-info.component';
import { CustomerContractsDetailItensComponent } from './customer-contracts/customer-contracts-detail/customer-contracts-detail-itens/customer-contracts-detail-itens.component';
import { CustomerContractsListPerCustomerComponent } from './customer-contracts/customer-contracts-list-per-customer/customer-contracts-list-per-customer.component';
import { ContractRoutingModule } from '../contracts/contract-routing.module';

@NgModule({
  declarations: [

    //customer
    CustomerListComponent,
    CustomerListTableComponent,
    CustomerDetailComponent,
    CustomerDetailInfoComponent,
    CustomerInfoComponent,

    //address
    CustomerAddressesListComponent,
    CustomerAddressesListTableComponent,
    CustomerAddressesDetailComponent,

    //supervisor
    CustomerSupervisorsListComponent,
    CustomerSupervisorsListTableComponent,
    CustomerSupervisorsDetailComponent,


    //customer contracts detail form
    CustomerContractsDetailComponent,
    CustomerContractsDetailItensComponent,
    ItemContractListTableComponent,

    //customer contracts
    CustomerContractsListPerCustomerComponent,
    CustomerContractsListPerCustomerTableComponent,

  ],
  imports: [
    CustomerRoutingModule,
    ContractRoutingModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    RouterModule,
    SharedModule,

  ]
})
export class CustomerModule { }
