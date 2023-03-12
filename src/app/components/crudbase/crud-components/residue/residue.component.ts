import { ResiduesService } from './../../../../services/residues.service';
import { CrudBaseService } from 'src/app/services/crudbase.service';

import { Component, OnInit } from '@angular/core';
import { Residue } from 'src/app/model/Residue';
import { CrudBaseComponent } from '../../crud-base.component';
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
  constructor(service:ResiduesService,private route: ActivatedRoute,public dialog: MatDialog) {
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


  openDialog(): void {

    const dialogRef = this.dialog.open(ResidueDetailComponent,{ data:{objectToEdit:this.objectToEdit}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editObject(object:any){
    this.objectToEdit = object;
  }


}
