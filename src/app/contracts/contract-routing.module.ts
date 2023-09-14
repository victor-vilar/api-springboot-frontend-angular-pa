import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerContractsListComponent } from './contracts-list/contracts-list.component';



const routes: Routes = [
  {path:'contratos',component:CustomerContractsListComponent}


]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ContractRoutingModule { }
