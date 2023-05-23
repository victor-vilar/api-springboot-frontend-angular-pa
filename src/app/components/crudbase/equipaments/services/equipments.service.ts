import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from '../../../../services/crudbase.service';
import { Injectable } from '@angular/core';
import { Equipment } from '../../../../util/entities/Equipment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService extends CrudBaseService<Equipment> {

  constructor(http:HttpClient) {
    super(http);
    this.rota='equipment'
   }

}
