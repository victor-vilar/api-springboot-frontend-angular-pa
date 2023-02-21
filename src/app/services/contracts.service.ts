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

   // save a contract to a client
  saveContract(type:Contract,clientCpfCnpj:string):Observable<Contract>{
    let routeToSaveContract = CrudBaseService.BASE_URL + this.rota +'/'+clientCpfCnpj
    return this.http.post<Contract>(routeToSaveContract,type);
  }

  //save a item to contract
  saveItemContract(listOfItens:ItemContract[],contractId:string):Observable<Contract>{
    let routeToSaveAnItemToContract = CrudBaseService.BASE_URL + this.rota +'/additem/'+contractId;
    return this.http.post<Contract>(routeToSaveAnItemToContract,type);
  }

  // deleteItemContract()
}
