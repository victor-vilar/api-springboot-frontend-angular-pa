import { EquipamentsService } from '../../../../services/equipaments.service';
import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/model/IBaseComponent';
import { Equipament } from 'src/app/model/Equipament';
import { CrudBaseComponent } from '../../crud-base.component';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent extends CrudBaseComponent<EquipamentsService> implements OnInit {

  //Default Methods
  constructor(service:EquipamentsService) {
    super('equipament',service);
  }

  override ngOnInit() {
      this.getAllFromApi();
      this.headerForTables = ['Id','Equipamento','Volume em M³','Selecionar'];
      this.title='Equipamentos';
  }


  addSelectTedItens(list:any){
    this.selectedItens = list;
  }


}

