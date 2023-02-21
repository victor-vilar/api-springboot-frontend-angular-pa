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
   //
  saveContract(type:Contract,clientCpfCnpj:string):Observable<Contract>{
    console.log('acessando:' +CrudBaseService.BASE_URL + this.rota +'/'+clientCpfCnpj,type);
    return this.http.post<Contract>(CrudBaseService.BASE_URL + this.rota +'/'+clientCpfCnpj,type);
  }
  // saveItemContract():Observable<Contract>{

  // }
}
