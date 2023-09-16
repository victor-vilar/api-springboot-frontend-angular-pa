import { Injectable } from '@angular/core';
import { Supervisor } from 'src/app/shared/entities/Supervisor';
import { Mapper } from 'src/app/shared/interfaces/mapper.mapper';

@Injectable({
  providedIn: 'root'
})
export class CustomerSupervisorsListTableComponentMapperService implements Mapper {


   mapItens(list:Supervisor[]):any[]{

    return list.map(e =>{
      return {
        id:e.id,
        name:e.name,
        phoneNumber:e.phoneNumber,
        email:e.email
      }
    })

   }
}
