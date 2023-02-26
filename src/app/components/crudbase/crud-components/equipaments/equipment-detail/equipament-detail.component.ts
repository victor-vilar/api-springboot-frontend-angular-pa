import { CrudBaseService } from 'src/app/services/crudbase.service';
import { FormDetail } from '../../../../../model/FormDetail';
import { Equipment } from '../../../../../model/Equipment';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from 'src/app/services/equipments.service';

@Component({
  selector: 'app-equipament-new',
  templateUrl: './equipament-detail.component.html',
  styleUrls: ['./equipament-detail.component.css']
})

/**
 * form to add new or update new elements
 */
export class EquipmentDetailComponent implements OnInit, FormDetail {

  @ViewChild('singInForm') form:NgForm;
  //id of the item that gonna be edited if the form is on edit mode
  idOfEditedItem:number;
  //operation that gonna be executed,
  crudOperation:string = "Cadastro";

  constructor(private service:EquipmentsService, private activeroute:ActivatedRoute, private router:Router) { }

  createObject(): any {

    let equipment = {
      id:this.idOfEditedItem,
      equipmentName:this.form.value.equipmentName,
      sizeInMeterCubic:Number(this.form.value.equipmentSize)
    }
    return equipment;
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    //checagem de parametros para entrar ou não no modo de edição do componente
    if(this.activeroute.snapshot.queryParamMap.get('edit')){
      this.crudOperation="Atualização"
      this.activeroute.paramMap.subscribe(value =>{
        this.service.getById(value.get('id'))
        .subscribe(val =>{
          if(val !== null){
              this.form.setValue({
                id:'Id: ' + val.id,
                equipmentName:val.equipmentName,
                equipmentSize:val.sizeInMeterCubic,
              })
              this.idOfEditedItem = val.id;
          }
        })
      })
  }
  }


  save(){
    //criando um novo objeto
    let object = this.createObject();
    //se for um objeto com id nulo, é um novo objeto
    //se não é atualização de um objeto existente.
    if(object.id === undefined){
    this.service.save(object)
    .subscribe(result => {
     this.service.getAll()
      //this.service.sendNull();
    })
    }else{
    this.service.update(object.id,object)
    .subscribe(result => {
      this.service.getAll()
     })
    }

   // this.destroy();
  }

  destroy(){
    this.router.navigate(['equipamentos']);
  }

  cleanForm(){
    this.form.reset();
  }
}