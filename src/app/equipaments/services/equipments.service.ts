import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from 'src/app/shared/services/crudbase.service';
import { Injectable } from '@angular/core';
import { Equipment } from '../../shared/entities/Equipment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService extends CrudBaseService<Equipment> {

  constructor() {
    super();
    this.rota='equipment'
   }

}
