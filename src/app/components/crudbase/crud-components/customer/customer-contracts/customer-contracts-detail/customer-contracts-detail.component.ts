import { DomOperationsService } from './../../../../../../services/dom-operations.service';
import { ItemContract } from './../../../../../../model/ItemContract';
import { EquipamentsService } from './../../../../../../services/equipaments.service';
import { Equipament } from './../../../../../../model/Equipament';
import { ResiduesService } from './../../../../../../services/residues.service';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Residue } from 'src/app/model/Residue';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-contracts-detail',
  templateUrl: './customer-contracts-detail.component.html',
  styleUrls: ['./customer-contracts-detail.component.css']
})
export class CustomerContractsDetailComponent implements OnInit {

  @ViewChild('form') form:NgForm;
  residuesService:ResiduesService;
  equipamentsService:EquipamentsService;

  residuesList:Residue[];
  equipamentsList:Equipament[];
  itemContractList:ItemContract[] = [];
  headerForTables;
  totalValueOfContract:number = 0;

  constructor(residuesService:ResiduesService,
              equipamentsService:EquipamentsService,
              private domOperationsService:DomOperationsService) {
                this.residuesService = residuesService;
                this.equipamentsService = equipamentsService;
               }

  ngOnInit(): void {
    console.log('iniciei');
    this.equipamentsService.refreshAllData().subscribe(e =>{
      console.log(e);
      this.equipamentsList = e;
    })

    this.residuesService.refreshAllData().subscribe(e => {
      console.log(e);
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


  mountItemContractObject():ItemContract{
    return {
      residue:this.residuesService.list.find(e => e.id === Number(this.form.value.residue)),
      equipament:this.equipamentsService.list.find(e => e.id === Number(this.form.value.equipament)),
      qtdOfResidue:Number(this.form.value.quantity),
      itemValue:Number(this.form.value.itemValue)
    }
  }

  addItemToContract(){
    let itemContract = this.mountItemContractObject();
    this.itemContractList.push(itemContract);
    this.sumTotalOfContract();
  }

  sumTotalOfContract(){
    this.itemContractList.forEach(e =>{
      this.totalValueOfContract += e.itemValue * e.qtdOfResidue;
    })
  }
  checkIfFormIsFilled(){

  }

  addNewContract(){
      //TODO -> SAVE CONTRACT
  }


  deleteItemFromList(index:number){
    this.itemContractList.splice(index,1);
    this.totalValueOfContract = 0;
    this.sumTotalOfContract();
  }


  }






