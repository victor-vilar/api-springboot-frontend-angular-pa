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

  constructor(service:EquipmentsService) {
    this.service = service;
  }

  ngOnInit() {

    this.headerForTables ={
     id:'Id',
     equipamentName:'Equipamento',
     sizeInMeterCubic:'Volume em M³'
    };

    this.title='Equipamentos';
    this.pathPrefix='equipamento';
    this.pathToOperations = [
        {name:"Cadastrar", path: this.pathPrefix + '/novo'},
    ];
  }
















}

