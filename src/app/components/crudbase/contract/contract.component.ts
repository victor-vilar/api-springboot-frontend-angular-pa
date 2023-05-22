import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/util/entities/Contract';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit{

  title='Contratos';
  pathToOperations = [];
  headerForTables = ['Id','Número','Data Inicio','Data Fim','Total $', "Selecionar"]
  listOfItens= [];




  constructor() { }
  getAllFromApi(): void {
    throw new Error('Method not implemented.');
  }
  getById(){

  }
  ngOnInit(): void {
  }

}
