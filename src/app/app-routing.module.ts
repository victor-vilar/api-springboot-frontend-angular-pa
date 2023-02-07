import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipamentsComponent } from './components/crudbase/crud-components/equipaments/equipaments.component';
import { ResidueComponent } from './components/crudbase/crud-components/residue/residue.component';
import { CustomerComponent } from './components/crudbase/crud-components/customer/customer.component';
import { ContractComponent } from './components/crudbase/crud-components/contract/contract.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'clientes',component:CustomerComponent},
  {path:'contratos',component:ContractComponent},
  {path:'residuos',component:ResidueComponent},
  {path:'equipamentos',component:EquipamentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
