import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { FormDetail } from 'src/app/shared/entities/FormDetail';
import { Equipment } from 'src/app/shared/entities/Equipment';
import { Component, OnInit, ViewChild, EventEmitter, Output, Inject, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentsService } from 'src/app/equipaments/services/equipments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';




//myerror class to volumeSize input display error messages
export class volumeErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if((isNaN(control.value) || control.value <= 0 || control.value === '') && (control.dirty || control.touched || isSubmitted) ){
      return true;
    }
    return false;
  }
}


@Component({
  selector: 'app-equipament-new',
  templateUrl: './equipament-detail.component.html',
  styleUrls: ['./equipament-detail.component.css']
})
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

  volumeFormControl = new FormControl('',[Validators.pattern(/^\d+$/)]);
  volumeErrorMatcher = new volumeErrorMatcher();



  constructor(private service:EquipmentsService,
     private activeroute:ActivatedRoute,
      private router:Router,
      public dialogRef: MatDialogRef<EquipmentDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogService:DialogServiceService) {
    }

  createObject(): any {
    return {
      id:this.idOfEditedItem,
      equipmentName:this.form.value.equipmentName,
      sizeInMeterCubic:Number(this.volumeFormControl.value)
    }
  }

  ngOnInit(): void {
    this.onLoad();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.form.setValue({
        equipmentName:this.objectToEdit.equipmentName,
      })
      this.volumeFormControl.setValue(this.objectToEdit.sizeInMeterCubic.toString());
    },100);

  }

  onLoad(): void {
      this.objectToEdit = this.data.objectToEdit;
      if(this.objectToEdit !== undefined && this.objectToEdit !== null){
        this.crudOperation="Atualização";
        this.idOfEditedItem = this.objectToEdit.id;
      }
  }

  checkIfVolumeInputIsNumber(){
    if(isNaN(Number(this.volumeFormControl.value)) || Number(this.volumeFormControl.value) <= 0 || this.volumeFormControl.value === '' ){
      console.log(this.form.value.equipmentSize)
      this.isInvalidVolume=true;
      this.isInvalidVolumeMessage = 'O valor do volume do equipamento deve ser do tipo número e ser maior que zero';
      throw Error('O valor do volume do equipamento deve ser do tipo número  número e ser maior que zero');
    }
  }



  checkIfEquipmentNameAreFilled(){
    if(!this.form.value.equipmentName.trim().length){
      this.isInvalidEquipmentName = true;
      this.isInvalidEquipmentNameMessage = 'O nome do não pode ser vazio!'
      throw Error('O nome do equipamento não pode ser vazio!');
    }
  }

  resetInvalidProperties(){
    this.isInvalidVolume = false;
    this.isInvalidEquipmentName = false;
  }

  save(){

    this.resetInvalidProperties();
    this.checkIfEquipmentNameAreFilled();
    this.checkIfVolumeInputIsNumber();


    this.dialogService.openProgressDialog();
    let observable$;
    let object = this.createObject();
    //se null object it is a new object
    //else it is a already exist one and it is a update
    if(object.id === undefined){
      observable$ = this.service.save(object);
    }else{
      observable$ = this.service.update(object);
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


  //

}
