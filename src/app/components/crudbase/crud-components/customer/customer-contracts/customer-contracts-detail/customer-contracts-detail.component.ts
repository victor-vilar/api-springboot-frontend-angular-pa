import { Router, ActivatedRoute } from '@angular/router';
import { Contract } from './../../../../../../model/Contract';
import { ItemContract } from './../../../../../../model/ItemContract';
import { EquipamentsService } from './../../../../../../services/equipaments.service';
import { Equipament } from './../../../../../../model/Equipament';
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
  equipamentsService:EquipamentsService;
  contractService:ContractsService;
  //---

  //lists
  residuesList:Residue[];
  equipamentsList:Equipament[];
  itemContractList:ItemContract[] = [];
  //---

  //CpfCnpj of selected client
  clientCpfCnpj:string;
  //form is on edit mode, here store the id of the item
  idOfEditedItem: string | number;
  //
  crudOperation: string;

  //headers for itemCOntract list
  headerForTables;
  //sum of itens of contract
  totalValueOfContract:number = 0;
  //---

  constructor(residuesService:ResiduesService,
              equipamentsService:EquipamentsService,
              contractService:ContractsService,
              private activatedRoute:ActivatedRoute,
              private router:Router,


              ) {
                this.residuesService = residuesService;
                this.equipamentsService = equipamentsService;
                this.contractService = contractService;
               }


  ngOnInit(): void {

    //get the cpf or cnpj from costumer to add a new contract
    this.clientCpfCnpj =this.activatedRoute.parent.snapshot.paramMap.get('cpfCnpj')

    //subscribing to equipament service and residue service
    this.equipamentsService.refreshAllData().subscribe(e =>{
      this.equipamentsList = e;
    })

    this.residuesService.refreshAllData().subscribe(e => {
      this.residuesList = e;
    })

    //initialize headers from child compoente- itens table
    this.headerForTables= {
      residue:"Residuo",
      equipament:"Equipamento",
      qtdOfResidue:"Quantidade",
      itemValue:"Valor",
    }
    this.onLoad();
    this.getAll();
  }

  //execute services methods to get all info from api
  ngOnChanges(changes: SimpleChanges): void {
    this.getAll();
  }

  //execute services methods to get all info from api
  getAll(){
    this.equipamentsService.getAll();
    this.residuesService.getAll();
  }

  //creates an itemContract from form fields
  createItemContractObject():ItemContract{
    return {
      residue:this.residuesService.list.find(e => e.id === Number(this.form.value.residue)),
      equipament:this.equipamentsService.list.find(e => e.id === Number(this.form.value.equipament)),
      qtdOfResidue:Number(this.form.value.quantity),
      itemValue:Number(this.form.value.itemValue)
    }
  }

  //creates a contract from form fields
  createObject():Contract{
    return {
      number:this.form.value.contractNumber,
      beginDate:this.form.value.beginDate,
      endDate:this.form.value.endDate,
    }
  }

  //add an item to contract
  addItemToContract(){
    let itemContract = this.createItemContractObject();
    this.itemContractList.push(itemContract);
    this.sumTotalOfContract();
  }


  //display the total contract price
  sumTotalOfContract(){
    this.itemContractList.forEach(e =>{
      this.totalValueOfContract += e.itemValue * e.qtdOfResidue;
    })
  }


  //creates a observable to manipulate response
  //if its ok, will again try to save contracts
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


  //saves contract at database
  save(){
    //check if contract has at least one item
    this.checkIfContractHasItens()
    //create a contract object
    let contract = this.createObject();

    //insert itens to contract
    //contract.itens = this.itemContractList;

    //creates a contractObserver
    let contractObserver = this.createsContractObserver();
    //response of save contract
    let observer$ = this.contractService.saveContract(contract, this.clientCpfCnpj);
    //executing observable
    observer$.subscribe(contractObserver);


  }

  //check if the contract have at least one item
  //don't creates empty contracts
  checkIfContractHasItens(){
    if(this.itemContractList.length === 0 ){
      throw Error('O contrato deve possuir pelo menos um item!!')
    }
  }

 //delete item from contract and recalulate the total value
  deleteItemFromList(index:number){
    this.itemContractList.splice(index,1);
    this.totalValueOfContract = 0;
    this.sumTotalOfContract();
  }




  //onload method to know if form going to be on edit mode or new mode
  onLoad(): void {
    //try to get queryParameter edit
    if(this.activatedRoute.snapshot.queryParamMap.get('edit')){
      //change the variable crud Operation to 'atualização' = update
      this.crudOperation="Atualização"
      //observable try to get the id param
      this.activatedRoute.paramMap.subscribe(value =>{
        //contract service try to get the contract by id
        this.contractService.getById(value.get('id'))
        .subscribe(val =>{
          //if value != null the form will be filled by value values
          if(val !== null){
              this.form.setValue({
                contractNumber:val.number,
                beginDate:val.beginDate,
                endDate:val.endDate,
                residue:'',
                equipament:'',
                quantity:'',
                itemValue:''
              })
              //the editItem variabel will be equals to val id
              this.idOfEditedItem = val.id;
              //copy the itens of val id to the current list
              this.itemContractList = val.itens.slice();
          }
        })
      })
    }
  }
  destroy(): void {
    this.router.navigate(['/clientes'])
  }
}






