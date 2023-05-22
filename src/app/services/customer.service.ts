import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../util/entities/Customer';
import { CrudBaseService } from './crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudBaseService<Customer>  {

  constructor(http:HttpClient) {
    super(http);
    this.rota='customer'
   }
}
