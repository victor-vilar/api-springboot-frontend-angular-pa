import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { ResiduesService } from 'src/app/services/residues.service';
import { CrudBaseService } from 'src/app/services/crudbase.service';

import { Component, OnInit } from '@angular/core';
import { Residue } from 'src/app/model/Residue';
import { CrudBaseComponent } from '../crud-base.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResidueDetailComponent } from './residue-detail/residue-detail.component';

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
  routeQueryParams$: Subscription;
  objectToEdit;

  constructor(service:ResiduesService,
    private route: ActivatedRoute,
    private dialogService:DialogServiceService) {
    this.service = service;

  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialog();
      }
    });

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

  //open dialog of detail form
  openDialog(): void {
    this.dialogService.openDialog(ResidueDetailComponent, this.objectToEdit, this.title.toLowerCase());
    console.log(this.route.queryParams);
    this.objectToEdit = null;
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
