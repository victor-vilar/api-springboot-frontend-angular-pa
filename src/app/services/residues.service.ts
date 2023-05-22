import { Residue } from 'src/app/util/entities/Residue';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudBaseService } from './crudbase.service';

@Injectable({
  providedIn: 'root'
})
export class ResiduesService  extends CrudBaseService<Residue> {

  constructor(http:HttpClient) {
    super(http);
    this.rota='residue'
   }
}
