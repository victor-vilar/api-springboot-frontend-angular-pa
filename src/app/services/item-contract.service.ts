import { ItemContract } from '../util/entities/ItemContract';
import { Injectable } from '@angular/core';
import { CrudBaseService } from './crudbase.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemContractService extends CrudBaseService<ItemContract>  {

  constructor(http:HttpClient) {
    super(http);
    this.rota='item-contract'
   }
}
