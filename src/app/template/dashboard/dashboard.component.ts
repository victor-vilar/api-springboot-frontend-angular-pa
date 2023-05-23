import { ResiduesService } from '../../residue/services/residues.service';
import { EquipmentsService } from '../../equipaments/services/equipments.service';
import { ContractsService } from '../../customer/services/contracts.service';
import { CustomerService } from '../../customer/services/customer.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  customerRegisteredLength;
  contractRegisteredLength;
  equipmentRegisteredLength;
  residueRegisteredLength;
  totalValue = 0;

  constructor(
    private customerService:CustomerService,
    private contractService:ContractsService,
    private equipmentService:EquipmentsService,
    private residueService:ResiduesService) { }

  ngOnInit(): void {

  this.customerService.refreshAllData().subscribe(response =>{this.customerRegisteredLength = response.length});

  this.contractService.refreshAllData().subscribe(response =>{
    this.contractRegisteredLength = response.length
    //return a list of lists of itens
    let listOfItens = response.map(e => e.itens);
    listOfItens.forEach(e =>
      //loop trough each item to sum all contracts
      e.forEach(c => this.totalValue += c.itemValue * c.qtdOfResidue));
  });

  this.equipmentService.refreshAllData().subscribe(response =>{this.equipmentRegisteredLength = response.length});
  this.residueService.refreshAllData().subscribe(response =>{this.residueRegisteredLength = response.length});

  this.customerService.getAll();
  this.contractService.getAll();
  this.equipmentService.getAll();
  this.residueService.getAll();


  }



}
