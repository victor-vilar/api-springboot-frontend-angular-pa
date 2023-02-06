import { from, Observable, of } from 'rxjs';
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
  headerForTables = ['Id','Equipamento','Volume em M³','Selecionar']
  listOfItens:any = [];



  constructor(private equipament:EquipamentsService) { }

  ngOnInit(): void {
    this.getAllFromApi();
  }

  getAllFromApi() {
    this.equipament.getAllEquipaments()
    .subscribe(next=>{
      this.listOfItens = next
      console.log(this.listOfItens);
    });
  }

  getById(){
    this.equipament.getEquipamentById(1)
    .subscribe(next=> next.equipamentName);
  }

  }

