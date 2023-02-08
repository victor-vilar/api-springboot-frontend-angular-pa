import { Equipament } from '../../../../../model/Equipament';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquipamentsService } from 'src/app/services/equipaments.service';

@Component({
  selector: 'app-equipament-new',
  templateUrl: './equipament-detail.component.html',
  styleUrls: ['./equipament-detail.component.css']
})
export class EquipamentDetailComponent implements OnInit {

  @ViewChild('singInForm') form:NgForm;

  rota='equipament'
  //id of the item that gonna be edited if the form is on edit mode
  idOfEditedItem:number;
  constructor(private service:EquipamentsService, private activeroute:ActivatedRoute) { }

  ngOnInit(): void {

    //checagem de parametros para entrar ou não no modo de edição do componente
    if(this.activeroute.snapshot.queryParamMap.get('edit')){
        this.activeroute.paramMap.subscribe(value =>{
          this.service.getById(value.get('id'),this.rota)
          .subscribe(val =>{
            if(val !== null){
                this.form.setValue({
                  id:'Id: ' + val.id,
                  equipamentName:val.equipamentName,
                  equipamentSize:val.sizeInMeterCubic,
                })
                this.idOfEditedItem = val.id;
            }
          })
        })
    }
  }

  sendDataToSave(){

    //criando um novo objeto
    let equipament = {
      id:this.idOfEditedItem,
      equipamentName:this.form.value.equipamentName,
      sizeInMeterCubic:Number(this.form.value.equipamentSize)
    }

    //se for um objeto com id nulo, é um novo objeto
    //se não é atualização de um objeto existente.
    if(equipament.id === undefined){
    this.service.save(equipament,this.rota)
    .subscribe(result => console.log('post feito'));
    }else{
      console.log(equipament.id,this.rota,equipament)
    this.service.update(equipament.id,this.rota,equipament)
    .subscribe(result => console.log('update feito'));
    }
  }
}
