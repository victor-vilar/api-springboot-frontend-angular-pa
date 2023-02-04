import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  title='Contratos';

  // informações para componente de crud-menu
  pathToOperations:string[] = [];
  // ------------------------------------------

  // informações para o componente itens-table
  headerForTables = [
    'Id','Número','Data Inicio','Data Fim','Total $'
  ]

  ContractsList:string[] = [];
  // ------------------------------------------



  constructor() { }
  ngOnInit(): void {
  }

}
