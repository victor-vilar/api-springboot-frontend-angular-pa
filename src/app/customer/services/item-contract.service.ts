import { ItemContract } from '../../shared/entities/ItemContract';
import { Injectable } from '@angular/core';
import { CrudBaseService } from '../../shared/services/crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class ItemContractService extends CrudBaseService<ItemContract>  {

  constructor() {
    super();
    this.rota='item-contract'
   }
}
