import { ContractStatus } from '../../../shared/enums/ContractStatus';

import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { Router, ActivatedRoute, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Contract } from 'src/app/shared/entities/Contract';
import { ItemContract, itemContractListForTests } from 'src/app/shared/entities/ItemContract';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerContractsService } from 'src/app/customer/services/customerContracts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getContractStatusValues } from 'src/app/shared/enums/ContractStatus';
import { CustomerContractsDetailItensComponent } from '../customer-contracts-detail-itens/customer-contracts-detail-itens.component';


@Component({
  selector: 'app-customer-contracts-detail',
  templateUrl: './customer-contracts-detail.component.html',
  styleUrls: ['./customer-contracts-detail.component.css']
})
export class CustomerContractsDetailComponent implements OnInit {

  //form
  @ViewChild('form') form:NgForm;
  @ViewChild('itensChild') child:CustomerContractsDetailItensComponent;


  //services

  contractService:CustomerContractsService;



  //list of itens of a contract
  itemContractList:ItemContract[] = [];

  //saves temporaly deleted itens from contract list to delete later
  deletedSavedItensIdList:number[] =[]
  //---

  //CpfCnpj of selected client
  clientCpfCnpj:string;
  //form is on edit mode, here store the id of the item
  idOfEditedItem: string | number = "0";

  //
  crudOperation: string = "Cadastro";
  objectToEdit:Contract;

  //headers for itemCOntract itens list
  headerForTables;


  //errors
  isInvalidContractDates:boolean = false;
  allFieldsMustBeFilledError:boolean = false;
  //---
  contractStatusEnumValues;




  constructor(
              contractService:CustomerContractsService,
              private activatedRoute:ActivatedRoute,
              private dialogService:DialogServiceService,
              private router:Router,
              public dialogRef: MatDialogRef<CustomerContractsDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {

                this.contractService = contractService;
               }



  ngOnInit(): void {
    console.log('on init component de contrato')
    this.onLoad();
    this.contractStatusEnumValues = getContractStatusValues();


  }

  //onload method to know if form going to be on 'edit' mode or 'new' mode
  onLoad(): void {

    //getting cpf/cnpj(id) from customer
    this.clientCpfCnpj = this.data.clientCpfCnpj;
    //if the object (contract) is not null
    if(this.data.objectToEdit !== undefined && this.data.objectToEdit !== null){

      //getting contract data
      this.objectToEdit = this.contractService.list.find(c =>c.id === this.data.objectToEdit.id);

    }

  }


  ngAfterViewInit(): void {

    setTimeout(() =>{
      if(this.objectToEdit  != null){
        this.form.setValue({
          contractNumber:this.objectToEdit.number,
          beginDate:new Date(this.objectToEdit.beginDate),
          endDate:new Date(this.objectToEdit.endDate),
          contractStatus:this.objectToEdit.contractStatus,
        })
        this.itemContractList = this.objectToEdit.itens;

      }
    },200);




  }

  //creates a contract from form fields
  createObject():any{
        return {
          number:this.form.value.contractNumber,
          beginDate:this.form.value.beginDate,
          endDate:this.form.value.endDate,
          contractStatus:this.form.value.contractStatus
        }
      }

  //fast filler to form(tests)
  mockingFormFiller(){
    console.log(this.contractStatusEnumValues);
    this.form.setValue({
      contractNumber:'1000',
      beginDate:new Date('2022-02-01'),
      endDate:new Date('2022-02-28'),
      contractStatus:ContractStatus.ATIVO
    })

    this.itemContractList = itemContractListForTests;


  }

  //saves contract at database
  save(){


    this.dialogService.openProgressDialog();
    //check if contract has at least one item


    //check if end date is bigger than begin date
    this.checkContractDatesBeforeSave();

    //do not save empty contracts
    this.checkIfContractHasItens();

    //create a contract object
    let contract = this.createObject();

    //adding list of itens to contract, that have been transformed;
    contract.itens = this.child.itemContractListMapper();
    contract.customerId = this.clientCpfCnpj;

    console.log(contract);


    //creates a contractObserver
    let contractObserver;

    //observervable$
    let observervable$;

    //if the idOfEditedItem === undefined means its a new contract not a edited one
    if(this.objectToEdit === null || this.objectToEdit === undefined){

      contractObserver = this.contractCreateObserver();
      observervable$ = this.contractService.save(contract);

      //if it's undefined it's just updating
    }else{

      //fill empty contract fields to make the update
      contract.id = this.objectToEdit.id;
      contract.customerId = this.objectToEdit.customerId;

      contractObserver = this.contractUpdateObserver();

      //put on api
      observervable$ = this.contractService.update(contract);
    }

    //executing observable
    observervable$.subscribe(contractObserver);

    this.destroy();
  }

  //check if begin date is small or equals to end date
  //end date must be bigger than begin date
  checkContractDates(){
    let beginDate = new Date(this.form.value.beginDate);
    let endDate = new Date(this.form.value.endDate);
    if(beginDate.getTime() >= endDate.getTime()){
      this.isInvalidContractDates = true;
      return true;
    }else{
      this.isInvalidContractDates = false;
      return false;
    }

  }

  //function to check if endDate is bigger than beginDate in matDatepickerFilter
  endDateFilter = (date: Date | null): boolean => {
    if (date && this.form.value.beginDate) {
      return date >= this.form.value.beginDate;
    }
    return true;
  }


  //show dialog error if contract dates are wrong
  checkContractDatesBeforeSave(){
    if(this.isInvalidContractDates){
      let errorMessage = 'A data de encerramento não pode ser igual ou anterior a data de inicio !'
      this.dialogService.openErrorDialog(errorMessage);
      throw Error(errorMessage);
    }
  }

    //check if the contract have at least one item
  //don't creates empty contracts
  checkIfContractHasItens(){
    if(this.itemContractList.length === 0 ){
      let errorMessage = 'O contrato deve possuir pelo menos um item!!'
      this.dialogService.openErrorDialog(errorMessage);
      throw Error(errorMessage);
    }

  }


  //check if the form imputs are filled
  //cant create itens with some data empty
  checkIfItemContractFromInputsAreFilled(){
    Object.values(this.form.controls).forEach(e =>{
      if(e.value === '' || e.value === null){
          let errorMessage = 'É necessario prencher todos os campos para adicionar um resíduo !!!'
          this.dialogService.openErrorDialog(errorMessage);
          throw Error(errorMessage);
      }
    })
  }

  /**
   * if some itens are deleted from the contract frontend list, it will be deleted from backend list
   */
  deleteItemsFromApi(){

    //if the list has itens, so the will be deleted from backend.
    if(this.deletedSavedItensIdList.length > 0){
      this.contractService.deleteItensFromContract(this.deletedSavedItensIdList)
      .subscribe(this.deleteItemFromContractObserver());
    }


  }

  //navigates to another page
  destroy(): void {
    this.dialogRef.close();

  }



  //observer to manipulate observable subscription
  //creates contract
  contractCreateObserver():any{
    return{
      next:(response) =>{
        //colse progress dialog
        this.dialogService.closeProgressSpinnerDialog();
        //show success message
        this.dialogService.openSucessDialog('Contrato salvo com sucesso !','/clientes');
        //update contract list
        this.contractService.getAll();

      },
      error:(error)=>{
        //close progress dialog
        this.dialogService.closeProgressSpinnerDialog();
        //show error message
        this.dialogService.openErrorDialog(error.message);
        console.log(error);
      }
    }
  }

  contractUpdateObserver():any{
    return{
      next:(response) =>{
        //close progress dialog
        this.dialogService.closeProgressSpinnerDialog();

        this.deleteItemsFromApi();
        //update contract list
        this.contractService.getAll();

      },
      error:(error)=>{
        //close progress dialog
        this.dialogService.closeProgressSpinnerDialog();
        //show error message
        this.dialogService.openErrorDialog(error.message);
      }
    }
  }


  //deletes contract
  deletesContractObserver():any{
    return{
      next:(response) =>{
        //close progress dialog
        this.dialogService.closeProgressSpinnerDialog();
        //show success message
        this.dialogService.openSucessDialog('Contrato deletado com sucesso !','/clientes');
      },
      error:(error)=>{
        //close progress dialog
        this.dialogService.closeProgressSpinnerDialog();
        //show error message
        this.dialogService.openErrorDialog(error.message);
      }
    }
  }

  //observer to do after eliminates a itemContract from databse;
  deleteItemFromContractObserver():any{
    return{
      next:(response) =>{
        //close progress spinner dialog
        console.log(response);
        //show success message
        this.dialogService.openSucessDialog('Contrato atualizado com sucesso !','/clientes');
        this.dialogService.closeProgressSpinnerDialog();

      },
      error:(error)=>{
        this.dialogService.closeProgressSpinnerDialog();
        console.log(error);
        this.dialogService.openErrorDialog(error);
      }
    }
  }
  //====================

  //override
  canDeactivate(){
    //if contract form it is dirty and the form button was not pressed to save the alteration
    //display message asking the if the user wants to save
    if(this.form.dirty){
        this.dialogService.openConfirmCloseDialog("Deseja sair sem salvar ?").subscribe(response =>{
          //if the user doesn't want to save, destroy component
          if(response){
            this.destroy();
          }
        })
    }else{
      this.destroy();
    }




  }
}






