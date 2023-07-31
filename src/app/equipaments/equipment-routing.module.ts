import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentDetailComponent } from './equipment-detail/equipament-detail.component';
import { EquipmentsComponent } from './equipment-list/equipaments.component';


const routes: Routes = [
  {path:'equipamentos',component:EquipmentsComponent, children:[
    {path:'equipamento/:id',component:EquipmentDetailComponent},
    {path:'equipamento/novo',component:EquipmentDetailComponent},

  ]},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class EquipmentRoutingModule { }
