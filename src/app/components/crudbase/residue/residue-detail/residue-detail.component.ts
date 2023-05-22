import { ResiduesService } from 'src/app/services/residues.service';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDetail } from 'src/app/model/FormDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { Residue } from 'src/app/model/Residue';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { ProgressComponent } from 'src/app/util/progress/progress.component';

@Component({
  selector: 'app-residue-detail',
  templateUrl: './residue-detail.component.html',
  styleUrls: ['./residue-detail.component.css']
})
export class ResidueDetailComponent implements OnInit,AfterViewInit, FormDetail {


  @ViewChild('singInForm') form: NgForm;
  idOfEditedItem: number;
  crudOperation = 'Cadastro';
  constructor(private service:ResiduesService,
              private activeroute:ActivatedRoute,
              private router:Router,
              public dialogRef: MatDialogRef<ResidueDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogService:DialogServiceService) { }


  isInvalidType = false;
  isInvalidTypeMessage = '';
  isInvalidDescription = false;
  isInvalidDescriptionMessage = '';
  objectToEdit:Residue;


  createObject():Residue {
    return {
      id:this.idOfEditedItem,
      type:this.form.value.type,
      description:this.form.value.description
    }
  }

  ngOnInit(){
    this.onLoad();
  }

  ngAfterViewInit(): void {

    setTimeout(() =>{
      this.form.setValue({
        type:this.objectToEdit.type,
        description:this.objectToEdit.description,
      })
    },100);

  }

  onLoad(): void {

    this.objectToEdit = this.data.objectToEdit;
    console.log(this.objectToEdit);
    if(this.objectToEdit !== undefined && this.objectToEdit !== null){
      console.log('estou aqui');
      this.crudOperation="Atualização";
      this.idOfEditedItem = this.objectToEdit.id;
    }
  }




  save(): void {


    this.resetInvalidProperties();
    this.checkIfInputFieldsAreFilled();
    this.dialogService.openProgressDialog();
    //criando um novo objeto
    let observable$;
    let residue = this.createObject();
    //se for um objeto com id nulo, é um novo objeto
    //se não é atualização de um objeto existente.
    if(residue.id === undefined){
        observable$ = this.service.save(residue);
    }else{
        observable$ = this.service.update(residue.id,residue);
    }
      observable$.subscribe(this.saveObjectObserver());

  }

  checkIfInputFieldsAreFilled(){
    if(!this.form.value.type.trim().length){
      this.isInvalidType = true;
      this.isInvalidTypeMessage = 'O tipo do residuo não pode ser vazio!'
      throw Error('O tipo do residuo não pode ser vazio!');
    }

    if(!this.form.value.description.trim().length){
      this.isInvalidDescription = true;
      this.isInvalidDescriptionMessage = 'A classe do residuo não pode ser vazio!'
      throw Error('A classe do residuo não pode ser vazio!');
    }
  }

  resetInvalidProperties(){
    this.isInvalidType = false;
    this.isInvalidDescription = false;
  }


  destroy(): void {
    this.objectToEdit =null
    this.dialogRef.close();
    //this.router.navigate(['residuos']);
  }

  cleanForm(){
    this.form.reset();
    this.resetInvalidProperties();
  }

  saveObjectObserver(){
    return{
      next:(response)=>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openSucessDialog('Resíduo salvo com sucesso !','residuos');
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
