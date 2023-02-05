import { IBaseComponent } from 'src/app/model/IBaseComponent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-residue',
  templateUrl: './residue.component.html',
  styleUrls: ['./residue.component.css']
})
export class ResidueComponent implements OnInit, IBaseComponent {

  title='Residuos'
  pathToOperations = [];
  headerForTables = ['Id','Residuo Tipo', "Selecionar"]
  listOfItens = [];



  constructor() { }
  ngOnInit(): void {
  }

}
