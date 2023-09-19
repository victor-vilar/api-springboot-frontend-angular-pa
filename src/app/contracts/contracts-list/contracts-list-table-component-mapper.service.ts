import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Customer } from 'src/app/shared/entities/Customer';
import { Mapper } from 'src/app/shared/interfaces/mapper.mapper';

@Injectable({
  providedIn: 'root'
})
export class ContractsListTableComponentMapperService implements Mapper {

  customerService:CustomerService
  constructor(customerService:CustomerService) {this.customerService = customerService }

  mapItens(list: any[]): any[] {
    return list.map(e => {
         e.customer = this.customerService.findCustomersByIdInList(e.customerId);
         let total = 0;
         e.itens.forEach(item=>total += item.itemValue * item.qtdOfResidue);
         e.totalEmRs=total
         return e;
        })
  }
}
