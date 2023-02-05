
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

  model = 'address';

  constructor(http: HttpClient, private finder:FindFullAddressService) {
    super(http);
  }

  async saveAddress(address: Address): Promise<Address | Observable<Address>> {
    return super.save(address, this.model);
  }


}
