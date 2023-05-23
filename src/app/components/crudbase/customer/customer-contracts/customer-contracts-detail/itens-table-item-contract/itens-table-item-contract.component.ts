import { MatDialog } from '@angular/material/dialog';
import { Residue } from 'src/app/util/entities/Residue';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../../../../util/confirmation-dialog/confirmation-dialog.component';
import { DialogServiceService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-itens-table-item-contract',
  templateUrl: './itens-table-item-contract.component.html',
  styleUrls: ['./itens-table-item-contract.component.css']
})



export class ItensTableItemContractComponent implements OnInit, DoCheck {


  searchedValue:string = '';

  //header of the data sended by component
  @Input()
  tableHeaders:string[] = [];

  // data that will fill the table
  @Input()
  tableData:any = [];
  filteredTableDataList:any;

  //model to fill the header tag
  @Input()
  model:string='';

  constructor(private router:Router,private dialogService:DialogServiceService, private dialog:MatDialog) { }


  ngOnInit(): void {
    //this.filteredTableData();
  }


  ngDoCheck() {
    this.filteredTableData();
  }


  findAliasInHeaderForTableArray(key:any){
    return this.tableHeaders[key];
  }

  @Output()
  deleteItemEmitter = new EventEmitter<any>();
  deleteItem(event:any){

    if(event.id !== null || event.id !== undefined){
      this.deleteItemEmitter.emit(event);
    }else{
      this.deleteItemEmitter.emit(event.id);
    }

  }


  showTableData(){
    console.log(this.tableData);
  }

  //here I needed to filter in element objects to work
  filteredTableData(){
    this.filteredTableDataList = this.tableData.filter(element => {
      if(Object.values(element.equipment).toString().toLowerCase().includes(this.searchedValue)){
        return element
      }
      if(Object.values(element.residue).toString().toLowerCase().includes(this.searchedValue)){
        return element;
      }
      if(Object.values(element).toString().toLowerCase().includes(this.searchedValue)){
        return element;
      }
    });
  }

  //open delete confirmation dialog
  openDialog(object:any){

    let observable$ = this.dialogService.openConfirmationDialog();
    observable$.subscribe(response =>{
      if(response){
        this.deleteItem(object);
      }
    })

  }

}
