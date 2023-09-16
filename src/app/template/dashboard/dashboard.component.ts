import { Subscription } from 'rxjs';
import { ResiduesService } from '../../residue/services/residues.service';
import { EquipmentsService } from '../../equipaments/services/equipments.service';
import { CustomerContractsService } from '../../customer/services/customerContracts.service';
import { CustomerService } from '../../customer/services/customer.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {


  customerRegisteredLength;
  contractRegisteredLength;
  equipmentRegisteredLength;
  residueRegisteredLength;
  totalValue = 0;
  subscriptionList:Subscription[] = [];

  constructor(
    private customerService:CustomerService,
    private contractService:CustomerContractsService,
    private equipmentService:EquipmentsService,
    private residueService:ResiduesService,
    private router:Router,
    private loginService:LoginService) { }


    ngOnDestroy(): void {
      this.subscriptionList.forEach(e => e.unsubscribe());
    }

  ngOnInit(): void {


  if(this.loginService.applicationUser === undefined){
        this.router.navigate(['/login'])
  }

  this.subscriptionList
  .push(
    this.customerService.refreshAllData()
    .subscribe(response =>{this.customerRegisteredLength = response.length})
    );

  this.subscriptionList
  .push(
    this.contractService.refreshAllData().subscribe(response =>{
        this.contractRegisteredLength = response.length
        console.log('ó a merda')
        //return a list of lists of itens
        let listOfItens = response.map(e => e.itens);
        listOfItens.forEach(e =>
          //loop trough each item to sum all contracts
          e.forEach(c => this.totalValue += c.itemValue * c.qtdOfResidue));
  }));

  this.subscriptionList
  .push(
    this.equipmentService.refreshAllData()
    .subscribe(response =>{this.equipmentRegisteredLength = response.length})
  );


  this.subscriptionList
  .push(
    this.residueService.refreshAllData()
    .subscribe(response =>{this.residueRegisteredLength = response.length})
  );

  this.customerService.getAll();
  this.contractService.getAll();
  this.equipmentService.getAll();
  this.residueService.getAll();


  }



}
