import { Observable } from "rxjs";

/**
 * map itens from api to itens table layout
 */
export interface Mapper {

  mapItens(list:any[]):any[];
}
