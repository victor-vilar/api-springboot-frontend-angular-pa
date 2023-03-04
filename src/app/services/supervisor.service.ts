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
  //  override save(address:Address){

  //  }

   getAllSupervisorsByCustomerId(customerId:string | number):Observable<Supervisor[]>{
    this.route = CrudBaseService.BASE_URL + this.rota + '/by-client/' + customerId;
    return this.http.get<Supervisor[]>(this.route);
   }
}
