import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../shared/entities/Customer';
import { CrudBaseService } from 'src/app/shared/services/crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudBaseService<Customer>  {

  constructor(http:HttpClient) {
    super(http);
    this.rota='customer'
   }
}
