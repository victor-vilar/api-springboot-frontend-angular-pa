import { IBaseComponent } from 'src/app/model/IBaseComponent';
import { Component, OnInit } from '@angular/core';
import { Residue } from 'src/app/model/Residue';

@Component({
  selector: 'app-residue',
  templateUrl: './residue.component.html',
  styleUrls: ['./residue.component.css']
})
export class ResidueComponent implements OnInit, IBaseComponent<Residue> {

  title='Residuos'
  pathToOperations = [];
  headerForTables = ['Id','Residuo Tipo', "Selecionar"]
  listOfItens = [];



  constructor() { }
  getAllFromApi(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
  }

}
