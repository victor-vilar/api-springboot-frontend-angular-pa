import { Injectable } from '@angular/core';
import { Address } from '../model/Address';
import { Contract } from '../model/Contract';
import { Supervisor } from '../model/Supervisor';
import { Observable, of } from 'rxjs';

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

      return {
        id:e.id,
        addressName:e.addressName,
        addressNumber:e.addressNumber,
        complement:e.complement,
        zipCode:e.zipCode,
        city:e.city,
        state:e.state,
        requiresCollection:e.requiresCollection,
      }
    })
  }

  toSupervisorsMapper(list:Supervisor[]):any[]{

    return list.map(e =>{
      return {
        id:e.id,
        name:e.name,
        phoneNumber:e.phoneNumber,
        email:e.email
      }
    })

   }
}
