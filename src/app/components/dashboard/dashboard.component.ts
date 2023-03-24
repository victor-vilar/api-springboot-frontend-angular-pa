import { ResiduesService } from './../../services/residues.service';
import { EquipmentsService } from './../../services/equipments.service';
import { ContractsService } from './../../services/contracts.service';
import { CustomerService } from './../../services/customer.service';

import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/Address';

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

  constructor(
    private customerService:CustomerService,
    private contractService:ContractsService,
    private equipmentService:EquipmentsService,
    private residueService:ResiduesService) { }

  ngOnInit(): void {

  this.customerService.refreshAllData().subscribe(response =>{this.customerRegisteredLength = response.length});
  this.contractService.refreshAllData().subscribe(response =>{this.contractRegisteredLength = response.length});
  this.equipmentService.refreshAllData().subscribe(response =>{this.equipmentRegisteredLength = response.length});
  this.residueService.refreshAllData().subscribe(response =>{this.residueRegisteredLength = response.length});

  this.customerService.getAll();
  this.contractService.getAll();
  this.equipmentService.getAll();
  this.residueService.getAll();


  }



}
