import { Residue } from './../../../model/Residue';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
export class ItensTableItemContractComponent implements OnInit {


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

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.filteredTableDataList = this.tableData;
  }

  findAliasInHeaderForTableArray(key:any){
    return this.tableHeaders[key];
  }

  //TODO DELETE EMITTER
  deleteItem(event:any){

  }

  editItem(event:any){

  }

  getAll(){

  };



  //O ARRAY QUE VEM DO PAI POSSUI ALGUNS OBJETOS DENTOS, ENTÃO NÃO CONSIGO BUSCAR ALGUNS DADOS,
  // ESTA DANDO ERRO NESSE FILTRO,
  // PRECISO CORRIGIR
  filteredTableData(){
    this.filteredTableDataList = this.tableData.filter(element => {
      if(Object.values(element).toString().toLowerCase().includes(this.searchedValue)){
        return element;
      }
    });
  }

}
