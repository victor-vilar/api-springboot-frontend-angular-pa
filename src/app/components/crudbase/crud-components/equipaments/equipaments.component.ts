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
  apiUrl;
  pathToOperations;
  service:EquipamentsService;

  constructor(service:EquipamentsService) {
    this.service = service;
  }

  ngOnInit() {
    this.headerForTables = ['Id','Equipamento','Volume em M³','Opções'];
    this.title='Equipamentos';
    this.pathPrefix='equipamento';
    this.apiUrl='equipament';
    this.pathToOperations = [
        {name:"Cadastrar", path: this.pathPrefix + '/novo'},
      ];
  }
















}

