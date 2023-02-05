import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/model/IBaseComponent';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit, IBaseComponent {

  title='Equipamentos'
  pathToOperations = [];
  headerForTables = ['Id','Equipamento','Volume','Selecionar']
  listOfItens = [];



  constructor() { }

  ngOnInit(): void {
  }

}
