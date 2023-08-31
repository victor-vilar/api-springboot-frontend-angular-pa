import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { Router, ActivatedRoute, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Contract } from 'src/app/shared/entities/Contract';
import { ItemContract } from 'src/app/shared/entities/ItemContract';
import { EquipmentsService } from 'src/app/equipaments/services/equipments.service';
import { Equipment } from 'src/app/shared/entities/Equipment';
import { ResiduesService } from 'src/app/residue/services/residues.service';
import { Component, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Residue } from 'src/app/shared/entities/Residue';
import { FormControl, NgForm } from '@angular/forms';
import { CustomerContractsService } from 'src/app/customer/services/customerContracts.service';
import { FormDetail } from 'src/app/shared/entities/FormDetail';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customer-contracts-detail',
  templateUrl: './customer-contracts-detail.component.html',
  styleUrls: ['./customer-contracts-detail.component.css']
})
export class CustomerContractsDetailComponent implements OnInit, FormDetail {

  //form
  @ViewChild('form') form:NgForm;
  //---

  //services
  residuesService:ResiduesService;
  equipmentsService:EquipmentsService;
  contractService:CustomerContractsService;
  //---

  //lists
  residuesList:Residue[];
  equipmentsList:Equipment[];
  //list of itens of a contract
  itemContractList:ItemContract[] = [];
  //saves temporaly deleted itens from contract list to delete later
  deletedItensFromContractList:ItemContract[] =[]
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
  //sum of itens of contract
  totalValueOfContract:number = 0;
  isInvalidContractDates:boolean = false;
  allFieldsMustBeFilledError:boolean = false;
  //---

  constructor(residuesService:ResiduesService,
              equipmentsService:EquipmentsService,
              contractService:CustomerContractsService,
              private activatedRoute:ActivatedRoute,
              private dialogService:DialogServiceService,
              private router:Router,
              public dialogRef: MatDialogRef<CustomerContractsDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackBar: MatSnackBar
              ) {
                this.residuesService = residuesService;
                this.equipmentsService = equipmentsService;
                this.contractService = contractService;
               }



  ngOnInit(): void {



    //subscribing to equipament service and residue service
    this.equipmentsService.refreshAllData().subscribe(e =>{
      this.equipmentsList = e;
    })

    this.residuesService.refreshAllData().subscribe(e => {
      this.residuesList = e;
    })

    //initialize headers from child compoente- itens table
    this.headerForTables=['No','descricao','Residuo','Equipamento','Quantidade','Valor','Opções']

    //get all services
    this.getAll();
    this.onLoad();




  }

  //onload method to know if form going to be on edit mode or new mode
  onLoad(): void {

    this.clientCpfCnpj = this.data.clientCpfCnpj;
    if(this.data.objectToEdit !== undefined && this.data.objectToEdit !== null){
      this.crudOperation="Atualização";
      this.objectToEdit = this.contractService.list.find(c =>c.id === this.data.objectToEdit.id);
      this.itemContractList = this.itemContractListFromApiMapper(this.objectToEdit.itens);
      this.sumTotalOfContract();
    }

  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      if(this.objectToEdit  != null){
        this.form.setValue({
          contractNumber:this.objectToEdit.number,
          beginDate:this.objectToEdit.beginDate,
          endDate:this.objectToEdit.endDate,
          residue:"",
          equipment:"",
          quantity:"",
          itemValue:"",
          description:""
        })
      }
    },200);
  }

  //execute services methods to get all info from api
  ngOnChanges(changes: SimpleChanges): void {
    this.getAll();

  }

  //execute services methods to get all info from api
  getAll(){
    this.equipmentsService.getAll();
    this.residuesService.getAll();
  }

  //creates an itemContract from form fields
  createItemContractObject():ItemContract{
    return {
      residue:this.residuesService.list.find(e => e.id === Number(this.form.value.residue)),
      equipment:this.equipmentsService.list.find(e => e.id === Number(this.form.value.equipment)),
      qtdOfResidue:Number(this.form.value.quantity),
      itemValue:Number(this.form.value.itemValue),
      description:this.form.value.description
    }
  }

  //creates a contract from form fields
  createObject():any{
    return {
      number:this.form.value.contractNumber,
      beginDate:this.form.value.beginDate,
      endDate:this.form.value.endDate,
    }
  }

  //add an item to contract
  addItemToContract(){

    //check if all fields of add item its filled.
    this.checkIfItemContractFromInputsAreFilled();

    //check if the values from qtd and value are numbers()
    this.checkIfItemContractInputsAreNumbers();

    let itemContract = this.createItemContractObject();


    //check if a item with the sames keys values exist, if is true, return a error
    let itemAlreadyExist = this.itemContractList.some(e => this.itemContractCompare(e, itemContract));

    if(itemAlreadyExist){
      throw Error('Já existe um item com os mesmos dados');
    }
    //push item to list
    this.itemContractList.push(itemContract);
    console.log(this.itemContractList.length);

    //sum total
    this.sumTotalOfContract();
    this.clearAddItensInputFieldsAfterAdd();

    this.openSnackBar("Resíduo inserido com sucesso","Cadastro");
  }

  //clear add itens to contract fields
  clearAddItensInputFieldsAfterAdd(){
    this.form.setValue({
      contractNumber:this.form.value.contractNumber,
      beginDate:this.form.value.beginDate,
      endDate:this.form.value.endDate,
      residue:'',
      equipment:'',
      quantity:'',
      itemValue:'',
      description:''
    })
  }

  //display the total contract price
  sumTotalOfContract(){
    this.totalValueOfContract = 0;
    this.itemContractList.forEach(e =>{
      this.totalValueOfContract += e.itemValue * e.qtdOfResidue;
    })
  }

  //transform the item contract list in a form that api could save the itens
  itemContractListMapper(){
    return this.itemContractList.map(e =>{
      return {
        id:e.id,
        residue:e.residue.id,
        equipment:e.equipment.id,
        qtdOfResidue:e.qtdOfResidue,
        itemValue:e.itemValue,
        description:e.description
      }
    })
  }

  //transform list of itens get from api to itemContract of front
  itemContractListFromApiMapper(list:any):ItemContract[]{
    return list.map(e =>{

      let residue = this.residuesService.list.find(r => r.type === e.residue);
      let equipment = this.equipmentsService.list.find(eq => eq.equipmentName === e.equipment);

      return {
        id:e.id,
        residue:residue,
        equipment:equipment,
        qtdOfResidue:e.qtdOfResidue,
        itemValue:e.itemValue,
        description:e.description
      }
    })
  }

  //saves contract at database
  save(){
    this.dialogService.openProgressDialog();
    //check if contract has at least one item
    this.checkIfContractHasItens();

    //check if end date is bigger than begin date
    this.checkContractDatesBeforeSave();

    //create a contract object
    let contract = this.createObject();
    contract.customerId = this.clientCpfCnpj;
    //insert itens to contract
    contract.itens = this.itemContractListMapper();
    console.log(contract);
    //creates a contractObserver
    let contractObserver = this.createsContractObserver();
    //observervable$
    let observervable$;
    //if the idOfEditedItem === undefined means its a new contract not a edited one

    if(this.objectToEdit === null || this.objectToEdit === undefined){
      observervable$ = this.contractService.save(contract);
    //if it's undefined it's just updating some item or value
    }else{
      //fill empty contract fields to make the update
      contract.id = this.objectToEdit.id;
      contract.customerId = this.objectToEdit.customerId;

      //put on api
      observervable$ = this.contractService.update(contract);
    }

    //executing observable
    observervable$.subscribe(contractObserver);
    this.deleteItemsFromApi();
    this.destroy();
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

  //check if the item contract item value and quantity are numbers
  checkIfItemContractInputsAreNumbers(){
    if(isNaN(this.form.value.quantity) || isNaN(this.form.value.itemValue) || this.form.value.quantity <= 0 || this.form.value.itemValue <=0){
      let errorMessage = 'Os campos de quantidade e valor, dos campos do cadastro de resíduos, devem ser do tipo número e serem maiores do que zero'
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


 //delete item from contract and recalulate the total value
  deleteItemFromList(item:ItemContract){

    //deletes a item from item contract list
    this.itemContractList = this.itemContractList.filter(e =>!this.itemContractCompare(e, item));


    //save deleted itens from itemContractlist to delete from api later
    this.deletedItensFromContractList.push(item);

    //refresh total value
    this.totalValueOfContract = 0;
    this.sumTotalOfContract();
  }

  //TODO -> NEED TO MAKE AN ENDPOIT TO DELETE A LIST OF ITENS RATHER THAN MAKE A REQUEST TO EACH ITEM TO DELETE.
  //delete a item from contract in api
  deleteItemsFromApi(){
    if(this.deletedItensFromContractList.length > 0){

      //get each item deleted and deletes from backend api
      this.deletedItensFromContractList.forEach(e => {
        if(e.id !== null && e.id !== undefined){
          let observable$ = this.contractService.deleteItemFromContract(e);
          let observer = this.deleteItemFromContractObserver();
          observable$.subscribe(observer);
        }
      })

    }

  }


  //needed to compare the itens. If the item comes from databse, it return with its id number,
  //and if try to save a new item it will be without id. i need to compare itens with and without id
  itemContractCompare(item1:ItemContract,item2:ItemContract){

    if(item1.id !== item2.id){
      return false;
    }

    if(item1.equipment !== item2.equipment){
      return false;
    }

    if(item1.residue !== item2.residue){
      return false;
    }

    if(item1.qtdOfResidue !== item2.qtdOfResidue){
      return false;
    }

    if(item1.itemValue !== item2.itemValue){
      return false;
    }

    if(item1.description !== item2.description){
      return false;
    }

    return true
  }

  //navigates to another page
  destroy(): void {
    this.dialogRef.close();
    console.log(this.activatedRoute.snapshot.toString);

  }

  //fast filler to form(tests)
  mockingFormFiller(){
    this.form.setValue({
      contractNumber:'1000',
      beginDate:'2022-02-01',
      endDate:'2022-02-28',
      residue:'1',
      equipment:'1',
      quantity:Math.floor(Math.random() * 100),
      itemValue:Math.floor(Math.random() * 100),
      description:"teste",
    })
  }

  //open snackbar angular material
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1000
    });
  }



  //observer to manipulate observable subscription
  //creates contract
  createsContractObserver():any{
    return{
      next:(response) =>{
        //colse progress dialog
        this.dialogService.closeProgressSpinnerDialog();
        //show success message
        this.dialogService.openSucessDialog('Contrato salvo com sucesso !','/clientes');
        //update all contract from api
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
  //create itemContract
  createsItemContractObserver():any{
    return{
      next:(response) =>{
        this.dialogService.closeProgressSpinnerDialog();
        console.log(response)
      },
      error:(error)=>{
        this.dialogService.closeProgressSpinnerDialog();
        console.log(error)
      }
    }
  }
  //observer to do after eliminates a itemCOntract from databse;
  deleteItemFromContractObserver():any{
    return{
      next:(response) =>{
        //close progress spinner dialog
        this.dialogService.closeProgressSpinnerDialog();

      },
      error:(error)=>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openErrorDialog(error.message);
      }
    }
  }
  //====================

  //override
  canDeactivate(){
    //if contract form it is dirty and the form button was not pressed to save the alteration
    //display message asking the user wants to save
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






