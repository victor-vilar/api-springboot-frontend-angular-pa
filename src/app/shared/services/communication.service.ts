import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * service used to send objects to components that doesn't have a relationship
 */


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  dataEmitter = new Subject<any>();

  sendData(object:any){
    this.dataEmitter.next(object);
    console.log('emiti no service')
  }



  constructor() { }
}
