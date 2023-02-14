import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
