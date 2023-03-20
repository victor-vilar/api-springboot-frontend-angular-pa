import { MatDialog } from '@angular/material/dialog';
import { Residue } from './../../../model/Residue';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogServiceService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-itens-table-item-contract',
  templateUrl: './itens-table-item-contract.component.html',
  styleUrls: ['./itens-table-item-contract.component.css']
})
/**
 * ESSE ITENS TABLE É SOMENTE PARA ARMARZENAR OS ITENS DOS CONTRATOS CADASTRADOS NA LISTA, OU SEJA, OS QUE AINDA NÃO FORAM SALVOS NO BANCO
 * COMO VI QUE IRIA SER NECESSARIO UTILIZAR O MESMO LAYOUT UTILIZADO NOS OUTROS ITENS TABLE, DECIDI UTILIZAR
 * PARA ARMAZENAR TEMPORARIAMENTE O RESIDUOS CADASTRADOS
 */
export class ItensTableItemContractComponent implements OnInit, OnChanges {


  searchedValue:string;

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
  ngOnChanges(changes: SimpleChanges): void {
    this.filteredTableData();
  }

  ngOnInit(): void {
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



  getAll(){

  };

  showTableData(){
    console.log(this.tableData);
  }


  //O ARRAY QUE VEM DO PAI POSSUI ALGUNS OBJETOS DENTRO, ENTÃO NÃO CONSIGO BUSCAR ALGUNS DADOS,
  // ESTA DANDO ERRO NESSE FILTRO,
  // PRECISO CORRIGIR
  filteredTableData(){
    this.filteredTableDataList = this.tableData.filter(element => {
      if(Object.values(element).toString().toLowerCase().includes(this.searchedValue)){
        return element;
      }
    });
  }


  openDialog(object:any){

    let observable$ = this.dialogService.openConfirmationDialog();
    observable$.subscribe(response =>{
      if(response){
        this.deleteItem(object);
      }
    })

  }

}
