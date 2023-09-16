import { Injectable } from '@angular/core';
import { Mapper } from 'src/app/shared/interfaces/mapper.mapper';

@Injectable({
  providedIn: 'root'
})

/**
 * transform the list of address in a way that the CustomerAddressListTableComponent show in his template
 */
export class CustomerAddressListTableComponentMapperService implements Mapper {


  constructor() { }

  /**
 * map the list to the CustomerListTableComponent
 * @param list the list that comes from api
 * @returns a mapped list of contract object
 */

  mapItens(list: any[]): any[] {
    return list.map(e =>{
      let required:string;

      if(e.requiresCollection){
        required = "sim"
      }
      else{
        required = "não"
      }

      return {
        id:e.id,
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
}



