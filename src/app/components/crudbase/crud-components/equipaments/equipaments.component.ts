import { EquipmentDetailComponent } from './equipment-detail/equipament-detail.component';
import { DialogServiceService } from './../../../../services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';
import { EquipmentsService } from '../../../../services/equipments.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Equipment } from 'src/app/model/Equipment';
import { CrudBaseComponent } from '../../crud-base.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipmentsComponent implements OnInit, CrudBaseComponent {

  //Default Methods
  headerForTables;
  title;
  pathPrefix;
  pathToOperations;
  service:EquipmentsService;
  objectToEdit:any;

  constructor(service:EquipmentsService,
     private route: ActivatedRoute,
     private dialogService:DialogServiceService) {
    this.service = service;
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });


    this.headerForTables ={
     id:'Id',
     equipmentName:'Equipamento',
     sizeInMeterCubic:'Volume em M³'
    };

    this.title='Equipamentos';
    this.pathPrefix='equipamento';
    this.pathToOperations = [
        {name:"Cadastrar novo Equipamento", path: this.pathPrefix + '/novo'},
    ];
  }

  openDialog(): void {
    this.dialogService.openDialog(EquipmentDetailComponent, this.objectToEdit);
  }


  editObject(object:any){
    this.objectToEdit = object;
  }
















}

