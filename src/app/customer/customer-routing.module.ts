import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../template/dashboard/dashboard.component';
import { CustomerAddressesDetailComponent } from './customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerAddressesComponent } from './customer-addresses/customer-addresses-list/customer-addresses.component';
import { CustomerContractsDetailComponent } from './customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { CustomerContractsComponentListPerCustomer } from './customer-contracts/customer-contracts-list-per-customer/customer-contracts-list-per-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerComponent } from './customer-list/customer.component';
import { CustomerSupervisorsDetailComponent } from './customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';
import { CustomerSupervisorsComponent } from './customer-supervisors/customer-supervisors-list/customer-supervisors.component';
import { CustomerDetailInfoComponent } from './customer-detail-info/customer-detail-info.component';


const routes: Routes = [
  {path:'clientes',component:CustomerComponent, children:[
    {path:'cliente/:id',component:CustomerDetailComponent},
    {path:'cliente/novo',component:CustomerDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/contratos',component:CustomerContractsComponentListPerCustomer, children:[
    {path:'contrato/:id',component:CustomerContractsDetailComponent},
    {path:'contrato/novo',component:CustomerContractsDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/enderecos',component:CustomerAddressesComponent, children:[
    {path:'endereco/:id',component:CustomerAddressesDetailComponent},
    {path:'endereco/novo',component:CustomerAddressesDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/fiscais',component:CustomerSupervisorsComponent, children:[
    {path:'fiscal/:id',component:CustomerSupervisorsDetailComponent},
    {path:'fiscal/novo',component:CustomerSupervisorsDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/informacoes',component:CustomerDetailInfoComponent}
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CustomerRoutingModule { }
