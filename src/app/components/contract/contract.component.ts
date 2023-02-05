import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/model/IBaseComponent';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit, IBaseComponent {

  title='Contratos';
  pathToOperations = [];
  headerForTables = ['Id','Número','Data Inicio','Data Fim','Total $', "Selecionar"]
  listOfItens= [];




  constructor() { }
  ngOnInit(): void {
  }

}
