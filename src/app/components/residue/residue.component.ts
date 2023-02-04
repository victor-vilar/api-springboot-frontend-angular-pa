import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-residue',
  templateUrl: './residue.component.html',
  styleUrls: ['./residue.component.css']
})
export class ResidueComponent implements OnInit {


  title='Residuos'

  // informações para componente de crud-menu
    pathToOperations:string[] = [];
  // ------------------------------------------
  // informações para o componente itens-table
  headerForTables = [
    'Id','Residuo Tipo'
    ]

    residuesList:string[] = [];
  // ------------------------------------------


  constructor() { }
  ngOnInit(): void {
  }

}
