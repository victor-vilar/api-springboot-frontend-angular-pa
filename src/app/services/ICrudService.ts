import { Observable } from "rxjs";

export interface ICrudService<T>{

  BASE_URL:string;
  list:T[];

  save(type:T):Promise<T> | Observable<T>;
  getAll():Promise<T> | Observable<T>;
  getById(id:number | string):Promise<T> | Observable<T>;
  update(id:number | string):Promise<T> | Observable<T>;
  delete(id:number | string):Promise<T> | Observable<T>;
  listSize():number;

}
