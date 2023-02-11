import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';
import { CrudBaseService } from './crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudBaseService<Customer>  {

  constructor(http:HttpClient) {
    super(http);
   }
}
