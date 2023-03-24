import { DialogServiceService } from './../../../../../../services/dialog-service.service';
import { SupervisorService } from './../../../../../../services/supervisor.service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDetail } from 'src/app/model/FormDetail';
import { Supervisor } from 'src/app/model/Supervisor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-supervisors-detail',
  templateUrl: './customer-supervisors-detail.component.html',
  styleUrls: ['./customer-supervisors-detail.component.css']
})
export class CustomerSupervisorsDetailComponent implements OnInit,AfterViewInit, FormDetail {

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private supervisorService:SupervisorService,
    public dialogRef: MatDialogRef<CustomerSupervisorsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogService:DialogServiceService) { }


  @ViewChild('form')form: NgForm;
  idOfEditedItem: string | number;
  crudOperation: string = 'Cadastro';
  objectToEdit:Supervisor;
  clientCpfCnpj:string;

  ngOnInit(): void {
    this.onLoad();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
     this.form.setValue({
              supervisorName:this.objectToEdit.name,
              supervisorPhone: this.objectToEdit.phoneNumber,
              supervisorEmail:this.objectToEdit.email,
        })
    },100);
  }


  createObject():Supervisor {
    return {
      name:this.form.value.supervisorName,
      phoneNumber:this.form.value.supervisorPhone,
      email:this.form.value.supervisorEmail,
    }
  }

  save(object: any): void {

    let observable$;
    let supervisor = this.createObject();
    supervisor.customerId = this.clientCpfCnpj;

    if(this.objectToEdit === undefined){
      observable$ = this.supervisorService.save(supervisor);
    }else{
      supervisor.id = this.objectToEdit.id;
      observable$ = this.supervisorService.update(supervisor.id,supervisor);
    }

    observable$.subscribe(this.saveSupervisorObserver());
    this.destroy();
  }

  saveSupervisorObserver(){
    return {
      next:(response) =>{
        this.dialogService.openSucessDialog('Fiscal salvo com sucesso !','/clientes');
        this.supervisorService.getAll();
      },
      error:(response) =>{
        this.dialogService.openErrorDialog('Ocorreu algum erro !');
        console.log(response);
      }
    }
  }

  onLoad(): void {


    this.clientCpfCnpj = this.data.clientCpfCnpj;
    if(this.objectToEdit !== undefined && this.objectToEdit !== null){
      this.crudOperation="Atualização";
      this.objectToEdit = this.data.objectToEdit;
      //this.idOfEditedItem = this.objectToEdit.id;
    }
  }

  destroy(): void {
    this.dialogRef.close();

  }

  cleanForm(){
    this.form.reset();
  }

}
