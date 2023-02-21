import { Router, ActivatedRoute } from '@angular/router';
import { Contract } from './../../../../../../model/Contract';
import { DomOperationsService } from './../../../../../../services/dom-operations.service';
import { ItemContract } from './../../../../../../model/ItemContract';
import { EquipamentsService } from './../../../../../../services/equipaments.service';
import { Equipament } from './../../../../../../model/Equipament';
import { ResiduesService } from './../../../../../../services/residues.service';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Residue } from 'src/app/model/Residue';
import { NgForm } from '@angular/forms';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-customer-contracts-detail',
  templateUrl: './customer-contracts-detail.component.html',
  styleUrls: ['./customer-contracts-detail.component.css']
})
export class CustomerContractsDetailComponent implements OnInit {

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

  //headers for itemCOntract list
  headerForTables;
  //sum of itens of contract
  totalValueOfContract:number = 0;

  constructor(residuesService:ResiduesService,
              equipamentsService:EquipamentsService,
              contractService:ContractsService,
              private activatedRoute:ActivatedRoute,

              ) {
                this.residuesService = residuesService;
                this.equipamentsService = equipamentsService;
                this.contractService = contractService;
               }

  ngOnInit(): void {

    this.clientCpfCnpj =this.activatedRoute.parent.snapshot.paramMap.get('cpfCnpj')

    this.equipamentsService.refreshAllData().subscribe(e =>{
      this.equipamentsList = e;
    })

    this.residuesService.refreshAllData().subscribe(e => {
      this.residuesList = e;
    })

    this.headerForTables= {
      residue:"Residuo",
      equipament:"Equipamento",
      qtdOfResidue:"Quantidade",
      itemValue:"Valor",
    }

    this.getAll();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.getAll();
  }


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
  createContractObject():Contract{
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
  //tentado configurar o backend para aceitar uma lista de itens na mesma requisição de salvar o contrato.
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
  addNewContract(){
    //check if contract has at least one item
    this.checkIfContractHasItens()

    //create a contract object
    let contract = this.createContractObject();

    //creates a contractObserver
    let contractObserver = this.createsContractObserver();





    this.contractService.saveContract(contract, this.clientCpfCnpj)
    .subscribe(contractObserver);


  }


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

}






