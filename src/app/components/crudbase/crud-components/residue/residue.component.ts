import { ResiduesService } from './../../../../services/residues.service';
import { CrudBaseService } from 'src/app/services/crudbase.service';

import { Component, OnInit } from '@angular/core';
import { Residue } from 'src/app/model/Residue';
import { CrudBaseComponent } from '../../crud-base.component';

@Component({
  selector: 'app-residue',
  templateUrl: './residue.component.html',
  styleUrls: ['./residue.component.css']
})
export class ResidueComponent implements OnInit, CrudBaseComponent{

  //Default Methods
  headerForTables;
  title;
  pathPrefix;
  pathToOperations;
  service:ResiduesService;

  constructor(service:ResiduesService) {
    this.service = service;
  }
  ngOnInit(): void {


    this.headerForTables ={
      id:'Id',
      type:'Resíduo',
      description:'Classe'
     };


    this.title='Resíduos';
    this.pathPrefix='residuo';
    this.pathToOperations = [
        {name:"Cadastrar novo Resíduo", path: this.pathPrefix + '/novo'},
      ];
  }


}
