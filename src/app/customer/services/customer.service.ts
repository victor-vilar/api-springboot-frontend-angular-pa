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

  //find first customer by customer id, in the list
  findCustomersByIdInList(customerCpfCnpj:string):Customer{
    if(this.list.length > 0){
      return this.list.find(customer => customer.cpfCnpj === customerCpfCnpj);
    }else{
      throw Error("Lista vazia é necessário relizar a busca primeiro !")
    }
    }
}
