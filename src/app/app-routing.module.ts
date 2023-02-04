import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipamentsComponent } from './components/equipaments/equipaments.component';
import { ResidueComponent } from './components/residue/residue.component';
import { ClientComponent } from './components/client/client.component';
import { ContractComponent } from './components/contract/contract.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'clientes',component:ClientComponent},
  {path:'contratos',component:ContractComponent},
  {path:'residuos',component:ResidueComponent},
  {path:'equipamentos',component:EquipamentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
