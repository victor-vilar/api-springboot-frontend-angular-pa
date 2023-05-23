import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Supervisor } from '../../shared/entities/Supervisor';
import { CrudBaseService } from 'src/app/shared/services/crudbase.service';
import { Mapper } from '../../shared/interfaces/mapper.mapper';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService extends CrudBaseService<Supervisor> implements Mapper   {

  constructor(http:HttpClient) {
    super(http);
    this.rota='supervisor'
   }

   route:string;

  getAllByCustomerId(customerId:string | number):Observable<Supervisor[]>{
    this.route = CrudBaseService.BASE_URL + this.rota + '/by-customer/' + customerId;
    return this.http.get<Supervisor[]>(this.route);
  }

  mapItens(list:any[]):any[]{
    return list.map(e =>{
      return {
        id:e.id,
        name:e.name,
        phoneNumber:e.phoneNumber,
        email:e.email
      }
    })
  }
}
