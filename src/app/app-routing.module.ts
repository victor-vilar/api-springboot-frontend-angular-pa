import { CustomerSupervisorsComponent } from './components/crudbase/crud-components/customer/customer-supervisors/customer-supervisors.component';
import { CustomerAddressesComponent } from './components/crudbase/crud-components/customer/customer-addresses/customer-addresses.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipamentsComponent } from './components/crudbase/crud-components/equipaments/equipaments.component';
import { ResidueComponent } from './components/crudbase/crud-components/residue/residue.component';
import { CustomerComponent } from './components/crudbase/crud-components/customer/customer.component';
import { ContractComponent } from './components/crudbase/crud-components/contract/contract.component';
import { EquipamentDetailComponent } from './components/crudbase/crud-components/equipaments/equipament-detail/equipament-detail.component';
import { ResidueDetailComponent } from './components/crudbase/crud-components/residue/residue-detail/residue-detail.component';
import { CustomerDetailComponent } from './components/crudbase/crud-components/customer/customer-detail/customer-detail.component';
import { CustomerContractsComponent } from './components/crudbase/crud-components/customer/customer-contracts/customer-contracts.component';
import { CustomerContractsDetailComponent } from './components/crudbase/crud-components/customer/customer-contracts/customer-contracts-detail/customer-contracts-detail.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'clientes',component:CustomerComponent, children:[
    {path:'cliente/:id',component:CustomerDetailComponent},
    {path:'cliente/novo',component:CustomerDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/contratos',component:CustomerContractsComponent, children:[
    {path:'contrato/:id',component:CustomerContractsDetailComponent},
    {path:'contrato/novo',component:CustomerContractsDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/enderecos',component:CustomerAddressesComponent, children:[
    {path:'endereco/:id',component:CustomerDetailComponent},
    {path:'endereco/novo',component:CustomerDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/fiscais',component:CustomerSupervisorsComponent, children:[
    {path:'fiscal/:id',component:CustomerDetailComponent},
    {path:'fiscal/novo',component:CustomerDetailComponent},
  ]},
  {path:'contratos',component:ContractComponent},
  {path:'residuos',component:ResidueComponent, children:[
    {path:'residuo/:id',component:ResidueDetailComponent},
    {path:'residuo/novo',component:ResidueDetailComponent},
  ]},
  {path:'equipamentos',component:EquipamentsComponent, children:[
    {path:'equipamento/:id',component:EquipamentDetailComponent},
    {path:'equipamento/novo',component:EquipamentDetailComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
