import { EquipamentsService } from './../../services/equipaments.service';
import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/model/IBaseComponent';
import { Equipament } from 'src/app/model/Equipament';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit, IBaseComponent<Equipament> {

  title='Equipamentos'
  pathToOperations = [];
  headerForTables = ['Id','Equipamento','Volume','Selecionar']
  listOfItens = [];



  constructor(private equipament:EquipamentsService) { }

  ngOnInit(): void {
  }

  getAllFromApi(): Promise<any> {
    throw new Error('Method not implemented.');
  }



}
