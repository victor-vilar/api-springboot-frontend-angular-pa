import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from './crudbase.service';
import { Injectable } from '@angular/core';
import { Equipament } from '../model/Equipament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipamentsService extends CrudBaseService<Equipament> {

  model="equipament";

  constructor(http:HttpClient) {
    super(http);
   }

  saveEquipament(equipament:Equipament):Observable<Equipament>{
    return super.save(equipament,this.model)
   }

  getAllEquipaments():Observable<Equipament>{
    return  super.getAll(this.model);
   }

   getEquipamentById(id:number | string):Observable<Equipament>{
    return  super.getById(id,this.model);
   }
}
