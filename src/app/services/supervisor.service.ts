import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
