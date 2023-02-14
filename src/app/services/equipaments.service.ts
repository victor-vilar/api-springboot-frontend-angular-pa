import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from './crudbase.service';
import { Injectable } from '@angular/core';
import { Equipament } from '../model/Equipament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipamentsService extends CrudBaseService<Equipament> {

  constructor(http:HttpClient) {
    super(http);
    this.rota='equipament'
   }

}
