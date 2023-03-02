import { Router, ActivatedRoute } from '@angular/router';
import { Contract } from './../../../../../../model/Contract';
import { ItemContract } from './../../../../../../model/ItemContract';
import { EquipmentsService } from '../../../../../../services/equipments.service';
import { Equipment } from '../../../../../../model/Equipment';
import { ResiduesService } from './../../../../../../services/residues.service';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Residue } from 'src/app/model/Residue';
import { NgForm } from '@angular/forms';
import { ContractsService } from 'src/app/services/contracts.service';
import { FormDetail } from 'src/app/model/FormDetail';


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
  contractService:ContractsService;
  //---

  //lists
  residuesList:Residue[];
  equipmentsList:Equipment[];
  itemContractList:ItemContract[] = [];
  //---

  //CpfCnpj of selected client
  clientCpfCnpj:string;
  //form is on edit mode, here store the id of the item
  idOfEditedItem: string | number = "0";
  contractToEdit:Contract = null;
  //
  crudOperation: string;

  //headers for itemCOntract itens list
  headerForTables;
  //sum of itens of contract
  totalValueOfContract:number = 0;
  //---

  constructor(residuesService:ResiduesService,
              equipmentsService:EquipmentsService,
              contractService:ContractsService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              ) {
                this.residuesService = residuesService;
                this.equipmentsService = equipmentsService;
                this.contractService = contractService;
               }


  ngOnInit(): void {

    //get the cpf or cnpj from costumer to add a new contract
    this.clientCpfCnpj =this.activatedRoute.parent.snapshot.paramMap.get('cpfCnpj')

    //subscribing to equipament service and residue service
    this.equipmentsService.refreshAllData().subscribe(e =>{
      this.equipmentsList = e;
    })

    this.residuesService.refreshAllData().subscribe(e => {
      this.residuesList = e;
    })

    //initialize headers from child compoente- itens table
    this.headerForTables= {
      residue:"Residuo",
      equipment:"Equipamento",
      qtdOfResidue:"Quantidade",
      itemValue:"Valor",
    }

    //get all services
    this.getAll();
    this.onLoad();

  }

  //onload method to know if form going to be on edit mode or new mode
  onLoad(): void {
      //try to get queryParameter edit
      if(this.activatedRoute.snapshot.queryParamMap.get('edit')){
        //change the variable crud Operation to 'atualização' = update
        this.crudOperation="Atualização"
        //observable  get the id param
        this.activatedRoute.paramMap.subscribe(value =>{
          //contract service try to get the contract by id
          this.contractService.getById(value.get('id'))
          .subscribe(val =>{
            //if value != null the form will be filled by val values
            if(val !== null){
                this.form.setValue({
                  contractNumber:val.number,
                  beginDate:val.beginDate,
                  endDate:val.endDate,
                  residue:'',
                  equipment:'',
                  quantity:'',
                  itemValue:''
                })

                //the contract that going to be edited
                this.contractToEdit = val;

                //copy the itens of val id to the current component list
                this.itemContractList = this.itemContractListFromApiMapper(val.itens);

                this.sumTotalOfContract();
            }
          })
        })
      }
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
      itemValue:Number(this.form.value.itemValue)
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
    let itemContract = this.createItemContractObject();

    //check if a item with the sames keys values exist, if is true, return a error
    let itemAlreadyExist = this.itemContractList.some(e => this.itemContractCompare(e, itemContract));

    if(itemAlreadyExist){
      throw Error('Já existe um item com os mesmos dados');
    }
    //push item to list
    this.itemContractList.push(itemContract);
    //sum total
    this.sumTotalOfContract();
    this.clearAddItensInputFieldsAfterAdd();
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
      itemValue:''
    })
  }

  //display the total contract price
  sumTotalOfContract(){
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
        itemValue:e.itemValue
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
        itemValue:e.itemValue
      }
    })
  }

  //saves contract at database
  save(){
    //check if contract has at least one item
    this.checkIfContractHasItens()
    //create a contract object
    let contract = this.createObject();

    //insert itens to contract
    contract.itens = this.itemContractListMapper();
    //creates a contractObserver
    let contractObserver = this.createsContractObserver();
    //response of save contract
    //if the idOfEditedItem === undefined means its a new contract not a edited one
    let observer$;
    if(this.contractToEdit === null){
      observer$ = this.contractService.save(contract);
    //if it's undefined it's just updating some item or value
    }else{
      //fill empty contract fields to make the update
      contract.id = this.contractToEdit.id;
      contract.customerId = this.contractToEdit.customerId;

      //put on api
      observer$ = this.contractService.updateContract(contract,contract.id);
    }

    //executing observable
    observer$.subscribe(contractObserver);
    this.destroy();
  }

  //check if the contract have at least one item
  //don't creates empty contracts
  checkIfContractHasItens(){
    if(this.itemContractList.length === 0 ){
      throw Error('O contrato deve possuir pelo menos um item!!')
    }
  }

 //delete item from contract and recalulate the total value
  deleteItemFromList(item:ItemContract){
    //this.itemContractList.splice(index,1);

    //if this deleted item has an id, it means it was saved on api before
    //so a need to delete from database and then update this list
    if(item.id != null || item.id !=undefined){
      let observable$ = this.contractService.deleteItemFromContract(item);
      let observer = this.deleteItemFromContractObserver();
      observable$.subscribe(observer);
    //if this deleted item hasn't an id, it means i only need to eliminate from this list
    }else{
      this.itemContractList = this.itemContractList.filter(e =>!this.itemContractCompare(e, item));
    }

    //refresh total value
    this.totalValueOfContract = 0;
    this.sumTotalOfContract();
  }

  //needed to compare the itens. If the item comes from databse, it return with a id number,
  //and if try to save a new item it will be without id. i need to compare itens with and without id
  itemContractCompare(item1:ItemContract,item2:ItemContract){

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

    return true
  }

  //navigates to another page
  destroy(): void {
    this.router.navigate(['/clientes'])
  }

  //fast filler to form(tests)
  mockingFormFiller(){
    this.form.setValue({
      contractNumber:'1000',
      beginDate:'2022-02-01',
      endDate:'2022-02-28',
      residue:'1',
      equipment:'1',
      quantity:100,
      itemValue:100
    })
  }


  //observer to manipulate observable subscription
  //creates contract
  createsContractObserver():any{
    return{
      next:(response) =>{
        console.log(response);
      },
      error:(error)=>{
        console.log(error);
      }
    }
  }
  //deletes contract
  deletesContractObserver():any{
    return{
      next:(response) =>{
        console.log(response);
        console.log('Deletado com sucesso !');
      },
      error:(error)=>{
        console.log(error);
      }
    }
  }
  //create itemContract
  createsItemContractObserver():any{
    return{
      next:(response) =>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    }
  }
  //observer to do after eliminates a itemCOntract from databse;
  deleteItemFromContractObserver():any{
    return{
      next:(response) =>{
        console.log(response);
        //if the list of the itens is 0, then will delete the contract from
        if(response.itens.length === 0){
          console.log('O contrato ficou sem itens, por isso será deletado automaticamente');
          let observevable$ = this.contractService.delete(response.id);
          let observer = this.deletesContractObserver();
          observevable$.subscribe(observer);
          this.itemContractList = [];
          this.contractService.getAll();
        }else{
          this.itemContractList = response.list;
        }

      },
      error:(error)=>{
        console.log(error)
      }
    }
  }
  //====================

}






