import { map, Observable, tap } from 'rxjs';
import { CustomerService } from './customer.service';
import { Injectable } from '@angular/core';
import { Contract } from '../model/Contract';
import { ContractResponse } from '../model/ContractResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractMapperService {

  constructor(private customerService:CustomerService) { }

  toContract(contractResponse:ContractResponse):Contract{
    return {
      id:contractResponse.id,
      number:contractResponse.number,
      beginDate:contractResponse.beginDate,
      endDate:contractResponse.endDate,
      itens:contractResponse.itens,
      customer:this.customerService.list.find(custumer => custumer.cpfCnpj === contractResponse.cutomerId)
    }
  }



  }

}
