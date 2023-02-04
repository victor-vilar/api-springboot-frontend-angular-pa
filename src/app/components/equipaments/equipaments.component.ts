import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit {


  // informações para componente de crud-menu
    pathToOperations:string[] = [];
  // ------------------------------------------
  // informações para o componente itens-table
  headerForTables = [
    'id','Equipamento','Volume','Selecionar'
  ]
  EquipamentsList:string[] = [];
  // ------------------------------------------


  constructor() { }

  ngOnInit(): void {
  }

}
