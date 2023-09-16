import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-equipment-list-table',
  templateUrl: './equipment-list-table.component.html',
  styleUrls: ['./equipment-list-table.component.css']
})
export class EquipmentListTableComponent extends ItensTableComponent {

  constructor(router:Router,mapper:MapperService,dialogService:DialogServiceService){
    super(router,dialogService)
}


}
