import { CustomerSupervisorsComponent } from './components/crudbase/customer/customer-supervisors/customer-supervisors.component';
import { CustomerAddressesComponent } from './components/crudbase/customer/customer-addresses/customer-addresses.component';

import { DashboardComponent } from './template/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './components/crudbase/equipaments/equipment-list/equipaments.component';
import { CustomerComponent } from './components/crudbase/customer/customer.component';
import { ContractComponent } from './components/crudbase/contract/contract.component';
import { EquipmentDetailComponent } from './components/crudbase/equipaments/equipment-detail/equipament-detail.component';
import { ResidueDetailComponent } from './components/crudbase/residue/residue-detail/residue-detail.component';
import { CustomerDetailComponent } from './components/crudbase/customer/customer-detail/customer-detail.component';
import { CustomerContractsComponent } from './components/crudbase/customer/customer-contracts/customer-contracts.component';
import { CustomerContractsDetailComponent } from './components/crudbase/customer/customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { CustomerAddressesDetailComponent } from './components/crudbase/customer/customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerSupervisorsDetailComponent } from './components/crudbase/customer/customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';
import { ResidueComponent } from './components/crudbase/residue/residue-list/residue.component';


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
    {path:'endereco/:id',component:CustomerAddressesDetailComponent},
    {path:'endereco/novo',component:CustomerAddressesDetailComponent},
  ]},
  {path:'cliente/:cpfCnpj/fiscais',component:CustomerSupervisorsComponent, children:[
    {path:'fiscal/:id',component:CustomerSupervisorsDetailComponent},
    {path:'fiscal/novo',component:CustomerSupervisorsDetailComponent},
  ]},
  {path:'contratos',component:ContractComponent},
  {path:'residuos',component:ResidueComponent, children:[
    {path:'residuo/:id',component:ResidueDetailComponent},
    {path:'residuo/novo',component:ResidueDetailComponent},
  ]},
  {path:'equipamentos',component:EquipmentsComponent, children:[
    {path:'equipamento/:id',component:EquipmentDetailComponent},
    {path:'equipamento/novo',component:EquipmentDetailComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
