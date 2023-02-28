
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/Address';
import { CrudBaseService } from './crudbase.service';
import { FullAddressFinderService } from './find-full-address.service';


@Injectable({
  providedIn: 'root'
})
export class AddressService extends CrudBaseService<Address> {

  constructor(http:HttpClient, private fullAddressFinderService:FullAddressFinderService ) {
    super(http);
    this.rota='address'
   }
   route:string;

   getAllAddressByCustomerId(clientCpfCnpj:string):Observable<Address[]>{
    this.route = this.route = CrudBaseService.BASE_URL + this.rota +'/'+clientCpfCnpj;
    return this.http.get<Address[]>(this.route);
   }
}
