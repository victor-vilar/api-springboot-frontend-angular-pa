
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../shared/entities/Address';
import { CrudBaseService } from 'src/app/shared/services/crudbase.service';
import { Mapper } from '../../shared/interfaces/mapper.mapper';


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


  mapItens(list:any[]):any[]{
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





}
