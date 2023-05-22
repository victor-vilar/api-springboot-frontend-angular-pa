import { Observable } from "rxjs";

export interface Mapper {

  mapItens(list:any[]):any[];
}
