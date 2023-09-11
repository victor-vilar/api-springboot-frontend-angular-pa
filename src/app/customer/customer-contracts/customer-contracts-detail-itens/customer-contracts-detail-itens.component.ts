import { WeekDay } from '@angular/common';
import { DialogServiceService } from './../../../shared/services/dialog-service.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentsService } from 'src/app/equipaments/services/equipments.service';
import { ResiduesService } from 'src/app/residue/services/residues.service';
import { CollectionFrequency } from 'src/app/shared/entities/CollectionFrequency';
import { Equipment } from 'src/app/shared/entities/Equipment';
import { ItemContract } from 'src/app/shared/entities/ItemContract';
import { Residue } from 'src/app/shared/entities/Residue';
import { getScheduleValues } from 'src/app/shared/entities/Schedule';
import { Weekday, getWeekdayValues } from 'src/app/shared/entities/Weekday';

@Component({
  selector: 'app-customer-contracts-detail-itens',
  templateUrl: './customer-contracts-detail-itens.component.html',
  styleUrls: ['./customer-contracts-detail-itens.component.css']
})
export class CustomerContractsDetailItensComponent implements OnInit, OnChanges {

    //form
    @ViewChild('form') form:NgForm;
    @ViewChild('daysInput') daysInput:HTMLSelectElement

    weekdayButtonDisabled:boolean = true;



    @Input()itemContractList:ItemContract[];
    @Input()deletedSavedItensIdList:number[];


    residuesService:ResiduesService;
    equipmentsService:EquipmentsService;
    residuesList:Residue[];
    equipmentsList:Equipment[];
    headerForTables:string[];


    weekdaysListToAddToItemContract:Weekday[] = [];


    //sum of itens of contract
    totalValueOfContract:number = 0;

    //enum values to fill the select components
    scheduleEnumValues = getScheduleValues();
    weekDaysEnumValues = getWeekdayValues();


  constructor(residuesService:ResiduesService,
    equipmentsService:EquipmentsService,
    private _snackBar: MatSnackBar,
    private dialogService:DialogServiceService) {
      this.residuesService = residuesService;
      this.equipmentsService = equipmentsService;
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
      this.headerForTables=['No','descricao','Residuo','Equipamento','Quantidade Equipamento','Quantidade','Valor','Opções']


      //maping itens from contract
      this.itemContractList = this.itemContractListFromApiMapper('teste');

      //updating view
      this.sumTotalOfContract();

  }

    //execute services methods to get all info from api
    ngOnChanges(changes: SimpleChanges): void {
      this.getAll();

    }

    //creates an itemContract from form fields
    createItemContractObject():ItemContract{
      return {
        residue:this.residuesService.list.find(e => e.id === Number(this.form.value.residue)),
        equipment:this.equipmentsService.list.find(e => e.id === Number(this.form.value.equipment)),
        equipmentQuantity:Number(this.form.value.equipmentQuantity),
        qtdOfResidue:Number(this.form.value.quantity),
        itemValue:Number(this.form.value.itemValue),
        description:this.form.value.description,
        collectionFrequency:this.createCollectionFrequency()
      }
    }

      //create collection frequency
    createCollectionFrequency():CollectionFrequency{
      return {
        days:this.weekdaysListToAddToItemContract,
        schedule:this.form.value.schedule
      }
    }


  //check if the form imputs are filled
  //cant create itens with some data empty
  checkIfItemContractFromInputsAreFilled(){
    Object.values(this.form.controls).forEach(e =>{
      if((e.value === '' || e.value === null) && (e !== this.form.controls['days'])){
          console.log(e === this.form.controls['days']);
          let errorMessage = 'É necessario prencher todos os campos para adicionar um resíduo !!!'
          this.dialogService.openErrorDialog(errorMessage);
          throw Error(errorMessage);
      }
    })
  }


  /**
   * update the list of the services
   */
  getAll(){
    this.equipmentsService.getAll();
    this.residuesService.getAll();
  }



  //add an item to contract
  addItemToContract(){

    //check if all fields of add item its filled.
    this.checkIfItemContractFromInputsAreFilled();

    //check if the fields from qtd and value are numbers()
    this.checkIfItemContractInputsAreNumbers();

    //creating new item contract object
    let itemContract = this.createItemContractObject();


    //check if a item with the sames keys values exist, if is true, return a error
    let itemAlreadyExist = this.itemContractList.some(e => this.itemContractCompare(e, itemContract));

    if(itemAlreadyExist){
      throw Error('Já existe um item com os mesmos dados');
    }

    //push item to list
    this.itemContractList.push(itemContract);

    //updating view of total value
    this.sumTotalOfContract();

    //clearing fields to add new itens
    this.clearAddItensInputFieldsAfterAdd();
    this.clearWeekdayList();

    //angular material snack bar message
    this.openSnackBar("Resíduo inserido com sucesso","Cadastro");
  }

  //clear add itens to contract fields
  clearAddItensInputFieldsAfterAdd(){
    this.form.setValue({
      residue:'',
      equipment:'',
      equipmentQuantity:'',
      quantity:'',
      itemValue:'',
      description:'',
      schedule:"",
      days:""
    })
  }

  /**
   * display the total contract price
   */
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



    //check if the item contract item value and quantity are numbers
    checkIfItemContractInputsAreNumbers(){
      if(isNaN(this.form.value.quantity) || isNaN(this.form.value.itemValue) || this.form.value.quantity <= 0 || this.form.value.itemValue <=0){
        let errorMessage = 'Os campos de quantidade e valor, dos campos do cadastro de resíduos, devem ser do tipo número e serem maiores do que zero'
        this.dialogService.openErrorDialog(errorMessage);
        throw Error(errorMessage);
      }
    }

      //open snackbar angular material
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1000
    });




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


  //delete item from contract and recalulate the total value
  deleteItemFromList(item:ItemContract){

    //deletes a item from item contract list
    this.itemContractList = this.itemContractList.filter(e =>!this.itemContractCompare(e, item));


    //if the item has an id, it was saved before, and need to be deleted from api.
    //this is necessary because sometimes an item it is added to the contractList and it is excluded before
    //the contract is saved in backend, so the item won't have and id.
    if(item.id !== null && item.id !== undefined){

      //saving item in a list to delete from backend.
      this.deletedSavedItensIdList.push(item.id);

    }

    //refresh total value
    this.sumTotalOfContract();
  }

  /**
   * add new weekday to itemContract weekday list
   */
  addNewWeekday(){

    if(!this.weekdaysListToAddToItemContract.find(e => e === this.form.value.days) && this.form.value.days !== ""){

      this.weekdaysListToAddToItemContract.push(this.form.value.days);
      this.openSnackBar("Dia inserido com sucesso a lista","Dia inserido");
    }

    this.daysInput.value = "";
    this.disableButton();


  }

  clearWeekdayList(){
    this.weekdaysListToAddToItemContract =[];
  }

  /**
   * if the days field is empty or the day is already in the list the button will be disabled
   */
  disableButton(){
    if(this.form.value.days === "" || this.weekdaysListToAddToItemContract.some(e => e === this.form.value.days)){
      this.weekdayButtonDisabled = true;

    }else{
      this.weekdayButtonDisabled = false;

    }
  }
}
