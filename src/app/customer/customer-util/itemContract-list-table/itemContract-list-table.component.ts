import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';
import { ItemContract } from 'src/app/shared/entities/ItemContract';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-itemContract-list-table',
  templateUrl: './itemContract-list-table.component.html',
  styleUrls: ['./itemContract-list-table.component.css']
})

export class ItemContractListTableComponent implements OnInit, OnChanges {


  dataSource:MatTableDataSource<any>;
  @Input()
  tableData = [];
  @Input()
  tableHeaders = []




  @Output() deleteResidueFromList = new EventEmitter<any>();
  deleteItemFromList(item: ItemContract){
      this.deleteResidueFromList.emit(item);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }



}
