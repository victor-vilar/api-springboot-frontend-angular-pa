import { Injectable } from '@angular/core';
import { Address } from '../model/Address';
import { Contract } from '../model/Contract';
import { Supervisor } from '../model/Supervisor';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }


  toItensTableContractMapper(list:Contract[]):any[]{
    return list.map(e => {

      let total = 0;
      e.itens.forEach(item=>total += item.itemValue * item.qtdOfResidue);

      return {
        id:e.id,
        number:e.number,
        beginDate:e.beginDate,
        endDate:e.endDate,
        totItens:e.itens.length,
        totalEmRs:total
      }
    })
  }

  toItensTableAddressMapper(list:Address[]):any[]{

    return list.map(e =>{
      let required:string;

      if(e.requiresCollection){
        required = 'sim';
      }else{
        required='não'
      }

      return {
        addressName:e.addressName,
        addressNumber:e.addressNumber,
        complement:e.complement,
        zipCode:e.zipCode,
        city:e.city,
        state:e.state,
        requiresCollection:required,
      }
    })
  }

  // toItensTableSupervisorMapper(list:Supervisor[]):any[]{

  // }
}
