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



  //delete a item from contract
  deleteItemFromContract(item:ItemContract):Observable<Contract>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/deleteitem/'+item.id;
    return this.http.delete<Contract>(this.route);
  }


  //get all contracts by customer id
  getContractByCustomerId(clientCpfCnpj:string):Observable<Contract[]>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/all/'+clientCpfCnpj;
    return this.http.get<Contract[]>(this.route);
  }
}
