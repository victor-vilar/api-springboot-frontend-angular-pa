import { CustomerSupervisorsComponent } from './customer/customer-supervisors/customer-supervisors-list/customer-supervisors.component';
import { CustomerAddressesComponent } from './customer/customer-addresses/customer-addresses-list/customer-addresses.component';

import { DashboardComponent } from './template/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './equipaments/equipment-list/equipaments.component';
import { CustomerComponent } from './customer/customer-list/customer.component';
import { EquipmentDetailComponent } from './equipaments/equipment-detail/equipament-detail.component';
import { ResidueDetailComponent } from './residue/residue-detail/residue-detail.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerContractsComponent } from './customer/customer-contracts/customer-contracts-list/customer-contracts.component';
import { CustomerContractsDetailComponent } from './customer/customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { CustomerAddressesDetailComponent } from './customer/customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerSupervisorsDetailComponent } from './customer/customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';
import { ResidueComponent } from './residue/residue-list/residue.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'residuos',component:ResidueComponent, children:[
    {path:'residuo/:id',component:ResidueDetailComponent},
    {path:'residuo/novo',component:ResidueDetailComponent},
  ]},

  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
