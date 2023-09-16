import { AfterViewInit, Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Residue } from 'src/app/shared/entities/Residue';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-residue-list-table',
  templateUrl: './residue-list-table.component.html',
  styleUrls: ['./residue-list-table.component.css']
})
export class ResidueListTableComponent extends ItensTableComponent{

  constructor(router:Router,mapper:MapperService,dialogService:DialogServiceService){
      super(router,dialogService)
  }








}
