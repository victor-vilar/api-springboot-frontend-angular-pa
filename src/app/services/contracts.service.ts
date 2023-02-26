import { ItemContract } from './../model/ItemContract';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../model/Contract';
import { CrudBaseService } from './crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsService extends CrudBaseService<Contract>  {

  constructor(http:HttpClient) {
    super(http);
    this.rota = 'contracts'
   }

   private route;

   // save a contract to a client
  saveContract(type:Contract,clientCpfCnpj:string):Observable<Contract>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/'+clientCpfCnpj
    return this.http.post<Contract>(this.route,type);
  }

  //update contract
  updateContract(type:Contract,id:string|number):Observable<Contract>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/'+id;
    return this.http.put<Contract>(this.route,type);
  };

  deleteContrat(){

  }

  deleteItemFromContract(item:ItemContract):Observable<Contract>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/'+item.id;
    return this.http.delete<Contract>(this.route);
  }
}
