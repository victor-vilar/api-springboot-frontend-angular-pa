import { CrudBaseService } from 'src/app/services/crudbase.service';
import { FormDetail } from './../../../../../model/FormDetail';
import { Equipament } from '../../../../../model/Equipament';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentsService } from 'src/app/services/equipaments.service';

@Component({
  selector: 'app-equipament-new',
  templateUrl: './equipament-detail.component.html',
  styleUrls: ['./equipament-detail.component.css']
})

/**
 * form to add new or update new elements
 */
export class EquipamentDetailComponent implements OnInit, FormDetail {

  @ViewChild('singInForm') form:NgForm;
  rota='equipament'
  //id of the item that gonna be edited if the form is on edit mode
  idOfEditedItem:number;
  //operation that gonna be executed,
  crudOperation:string = "Cadastro";

  constructor(private service:EquipamentsService, private activeroute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    //checagem de parametros para entrar ou não no modo de edição do componente
    if(this.activeroute.snapshot.queryParamMap.get('edit')){
      this.crudOperation="Atualização"
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


  save(){
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
    .subscribe(result => {
     this.service.getAll(this.rota)
      //this.service.sendNull();
    })
    }else{
    this.service.update(equipament.id,this.rota,equipament)
    .subscribe(result => {
      this.service.getAll(this.rota)
     })
    }

    this.destroy();
  }

  destroy(){
    this.router.navigate(['equipamentos']);
  }

  cleanForm(){
    this.form.reset();
  }
}
