import { ActivatedRoute } from '@angular/router';
import { EquipamentsService } from '../../../../services/equipaments.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Equipament } from 'src/app/model/Equipament';
import { CrudBaseComponent } from '../../crud-base.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit, CrudBaseComponent {

  //Default Methods
  headerForTables;
  title;
  pathPrefix;
  pathToOperations;
  service:EquipamentsService;

  constructor(service:EquipamentsService) {
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

