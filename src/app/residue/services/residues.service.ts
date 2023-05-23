import { Residue } from 'src/app/shared/entities/Residue';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from 'src/app/shared/services/crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class ResiduesService  extends CrudBaseService<Residue> {

  constructor(http:HttpClient) {
    super(http);
    this.rota='residue'
   }
}
