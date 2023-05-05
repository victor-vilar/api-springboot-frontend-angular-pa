import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supervisor } from '../model/Supervisor';
import { CrudBaseService } from './crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService extends CrudBaseService<Supervisor>  {

  constructor(http:HttpClient) {
    super(http);
    this.rota='supervisor'
   }

   route:string;

  getAllByCustomerId(customerId:string | number):Observable<Supervisor[]>{
    this.route = CrudBaseService.BASE_URL + this.rota + '/by-customer/' + customerId;
    return this.http.get<Supervisor[]>(this.route);
  }

  mapItens(){
    return this.list.map(e =>{
      return {
        id:e.id,
        name:e.name,
        phoneNumber:e.phoneNumber,
        email:e.email
      }
    })
  }
}
