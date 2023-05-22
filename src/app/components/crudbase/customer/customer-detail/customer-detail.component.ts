import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDetail } from 'src/app/util/entities/FormDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/util/entities/Customer';
import { ResidueDetailComponent } from '../../residue/residue-detail/residue-detail.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, AfterViewInit, FormDetail {

  constructor(private service:CustomerService,
     private activeroute:ActivatedRoute,
      private router:Router,
      public dialogRef: MatDialogRef<ResidueDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogService:DialogServiceService) { }

  @ViewChild('singInForm')form: NgForm;
  rota: string = 'customer';
  idOfEditedItem: number | string;
  crudOperation: string = "Cadastro";
  objectToEdit:Customer;

  //error handlers
  invalidCpfCnpj = false;
  invalidCpfCnpjMessage:string;
  invalidCustomerName = false;
  invalidCustomerNameMessage:string;

  ngOnInit(): void {
    this.onLoad();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.form.setValue({
        cpfCnpj:this.objectToEdit.cpfCnpj,
        razaoSocial:this.objectToEdit.nameCompanyName,
      })},100
    )

  }

  createObject():Customer{
    return {
      cpfCnpj:this.form.value.cpfCnpj,
      nameCompanyName:this.form.value.razaoSocial,
    }

  }

  checkIfRazaoSocialAreFilled(){
    if(!this.form.value.razaoSocial.trim().length){
      this.invalidCustomerName = true;
      this.invalidCustomerNameMessage = 'O nome do cliente não pode ser vazio!'
      throw Error('O nome do cliente não pode ser vazio!');
    }
  }

  resetInvalidProperties(){
    this.invalidCustomerName = false;
    this.invalidCpfCnpj = false;
  }

  save(): void {

    this.resetInvalidProperties();
    this.checkIfRazaoSocialAreFilled();

    this.dialogService.openProgressDialog();
    let customer = this.createObject();
    let obervable$;

    if(this.idOfEditedItem === undefined){
      obervable$ =this.service.save(customer);
    }else{
      obervable$ =this.service.update(customer.cpfCnpj,customer)
    }

    obervable$.subscribe(this.customerObserver());

  }

  onLoad(): void {
    this.objectToEdit = this.data.objectToEdit;
    if(this.objectToEdit !== undefined && this.objectToEdit !== null){
      this.crudOperation="Atualização";
      this.idOfEditedItem = this.objectToEdit.cpfCnpj;
    }

  }
  destroy(): void {
    this.dialogRef.close();
  }

  cleanForm(){
    this.form.reset();
  }

  private customerObserver(){

    return{
      next:(response)=>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openSucessDialog('Cliente salvo com sucesso !','/clientes');
        this.service.getAll();
        this.destroy();
      },
      error:(response)=>{
        this.dialogService.closeProgressSpinnerDialog();

        if(response.error.message === "This CPF or CNPJ is Invalid"){
          this.invalidCpfCnpj = true;
          this.invalidCpfCnpjMessage = "Esse é um CPF/CNPJ invalido";
        }
        if(response.error.message === "This Cpf/Cnpj already exists in database"){
          this.invalidCpfCnpj = true;
          this.invalidCpfCnpjMessage = "Um cliente com esse CPF ou CNPJ ja esta cadastrado";
        }

        this.dialogService.openErrorDialog(this.invalidCpfCnpjMessage);
      }
    }
  }
}
