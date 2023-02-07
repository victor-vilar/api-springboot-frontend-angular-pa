
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/Address';
import { CrudBaseService } from './crudbase.service';
import { FindFullAddressService } from './find-full-address.service';


@Injectable({
  providedIn: 'root'
})
export class AddressService extends CrudBaseService<Address> {


}
