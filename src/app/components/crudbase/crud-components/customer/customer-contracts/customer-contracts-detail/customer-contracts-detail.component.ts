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

  //TODO -> CREATES A DIV IN VIEW TO SHOW THE ITENS ADDED
  //TODO -> CREATES A LIST TO STORE THESE ITENS

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

  }


    addNewContract(){
      //TODO -> SAVE CONTRACT
    }


    eraseAddResidueDiv(){

    }


  }






