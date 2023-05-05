
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/Address';
import { CrudBaseService } from './crudbase.service';
import { FullAddressFinderService } from './find-full-address.service';
import { MapperService } from './mapper.service';
import { Mapper } from '../mapper.mapper';


@Injectable({
  providedIn: 'root'
})
export class AddressService extends CrudBaseService<Address> implements Mapper  {

  constructor(http:HttpClient) {
    super(http);
    this.rota='address'
   }

   route:string;

   //get all address by customer id
  getAllByCustomerId(customerCpfCnpj:string):Observable<Address[]>{
    this.route = this.route = CrudBaseService.BASE_URL + this.rota +'/by-customer/'+customerCpfCnpj;
    return this.http.get<Address[]>(this.route);
  }


  mapItens(){
    return this.list.map(e =>{
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





}
