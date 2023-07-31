import { ItemContract } from '../../shared/entities/ItemContract';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contract } from '../../shared/entities/Contract';
import { CrudBaseService } from 'src/app/shared/services/crudbase.service';
import { Mapper } from '../../shared/interfaces/mapper.mapper';

@Injectable({
  providedIn: 'root'
})
export class CustomerContractsService extends CrudBaseService<Contract> implements Mapper  {

  constructor(http:HttpClient) {
    super(http);
    this.rota = 'contracts'
   }

   private route;



  //delete a item from contract
  deleteItemFromContract(item:ItemContract):Observable<Contract>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/deleteitem/'+item.id;
    return this.http.delete<Contract>(this.route,{withCredentials:true});
  }


  //get all contracts by customer id
  getAllByCustomerId(clientCpfCnpj:string):Observable<Contract[]>{
    this.route = CrudBaseService.BASE_URL + this.rota +'/all/'+clientCpfCnpj;
    return this.http.get<Contract[]>(this.route,{withCredentials:true});
  }

  override
  mapItens(list:any[]):any[]{

    return list.map(e => {

      let total = 0;
      e.itens.forEach(item=>total += item.value * item.qtdOfResidue);

      return {
        id:e.id,
        number:e.number,
        beginDate:e.beginDate,
        endDate:e.endDate,
        totItens:e.itens.length,
        totalEmRs:total
      }
    })
  }
}
