import { DialogServiceService } from './../../../../../services/dialog-service.service';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/services/crudbase.service';
import { FormDetail } from '../../../../../model/FormDetail';
import { Equipment } from '../../../../../model/Equipment';
import { Component, OnInit, ViewChild, EventEmitter, Output, Inject, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-equipament-new',
  templateUrl: './equipament-detail.component.html',
  styleUrls: ['./equipament-detail.component.css']
})

/**
 * form to add new or update new elements
 */
export class EquipmentDetailComponent implements OnInit, AfterViewInit, FormDetail {

  @ViewChild('singInForm') form:NgForm;
  //id of the item that gonna be edited if the form is on edit mode
  idOfEditedItem:number;
  //operation that gonna be executed,
  crudOperation:string = "Cadastro";
  isInvalidEquipmentName:boolean = false;
  isInvalidEquipmentNameMessage:string;
  isInvalidVolume:boolean = false;
  isInvalidVolumeMessage:string;
  objectToEdit:Equipment;



  constructor(private service:EquipmentsService,
     private activeroute:ActivatedRoute,
      private router:Router,
      public dialogRef: MatDialogRef<EquipmentDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogService:DialogServiceService) { }

  createObject(): any {
    return {
      id:this.idOfEditedItem,
      equipmentName:this.form.value.equipmentName,
      sizeInMeterCubic:Number(this.form.value.equipmentSize)
    }
  }

  ngOnInit(): void {
    this.onLoad();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.form.setValue({
        equipmentName:this.objectToEdit.equipmentName,
        equipmentSize:this.objectToEdit.sizeInMeterCubic,
      })
    },100);

  }

  onLoad(): void {
      this.objectToEdit = this.data.objectToEdit;
      if(this.objectToEdit !== undefined && this.objectToEdit !== null){
        this.crudOperation="Atualização";
        this.idOfEditedItem = this.objectToEdit.id;
      }
  }

  checkIfItemContractInputsAreNumbers(){
    if(isNaN(this.form.value.equipmentSize) || this.form.value.equipmentSize === 0){
      this.isInvalidVolume=true;
      this.isInvalidVolumeMessage = 'O valor do volume do equipamento deve ser do tipo número e ser maior que zero';
      throw Error('O valor do volume do equipamento deve ser do tipo número  número e ser maior que zero');
    }
  }
  checkIfEquipamentNameAreFilled(){
    if(!this.form.value.equipmentName.trim().length){
      this.isInvalidEquipmentName = true;
      this.isInvalidEquipmentNameMessage = 'O nome do equipamento não pode ser vazio!'
      throw Error('O nome do equipamento não pode ser vazio!');
    }
  }

  resetInvalidProperties(){
    this.isInvalidVolume = false;
    this.isInvalidEquipmentName = false;
  }

  save(){
    this.dialogService.openProgressDialog();

    this.resetInvalidProperties();
    this.checkIfEquipamentNameAreFilled();
    this.checkIfItemContractInputsAreNumbers();

    let observable$;
    let object = this.createObject();
    //se null object it is a new object
    //else it is a already exist one and it is a update
    if(object.id === undefined){
      observable$ = this.service.save(object);
    }else{
      observable$ = this.service.update(object.id,object);
    }

    observable$.subscribe(this.saveObjectObserver());

  }

  destroy(){
    this.objectToEdit = null
    this.dialogRef.close();

  }

  cleanForm(){
    this.form.reset();
  }

  saveObjectObserver(){
    return{
      next:(response)=>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openSucessDialog('Equipamento salvo com sucesso !','equipamentos');
        this.service.getAll();
        this.destroy();
      },
      error:(response)=>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openErrorDialog('Ocorreu algum erro !');
        console.log(response);
      }
    }
  }



}
