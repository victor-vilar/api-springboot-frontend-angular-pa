import { CustomerService } from './../../../../../services/customer.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customer-contracts',
  templateUrl: './customer-contracts.component.html',
  styleUrls: ['./customer-contracts.component.css']
})
export class CustomerContractsComponent implements OnInit {

  constructor(
    private customerService:CustomerService,
    private contractService:ContractsService,
    private activeRoute:ActivatedRoute) { }

  selectedCustomer:Customer;

  ngOnInit(): void {


      //===CODIGO UTILIZADO SOMENTE EM DESENVOLVIMENTO
      this.customerService.refreshAllData()
      .subscribe(value =>{
        console.log(value);
        this.activeRoute.paramMap.subscribe(e =>{
        this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === e.get('cpfCnpj'))})}
        );
        //============================================



      //this.selectedCustomer = this.customerService.list.find(obj => obj.cpfCnpj === e.get('cpfCnpj'))})
  }


ngOnChanges(changes: SimpleChanges): void {
  this.customerService.getAll();
}


}
