import { CustomerSupervisorsComponent } from './customer/customer-supervisors/customer-supervisors-list/customer-supervisors.component';
import { CustomerAddressesComponent } from './customer/customer-addresses/customer-addresses-list/customer-addresses.component';

import { DashboardComponent } from './template/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
