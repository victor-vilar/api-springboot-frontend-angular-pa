import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class CrudBaseService<T>{

  static BASE_URL:string = "https://localhost:8080/";


  constructor(private list:T[], private http:HttpClient){}


  async save(type:T,router:string):Promise<T |Observable<T>>{
    return this.http.post<T>(CrudBaseService.BASE_URL + router,type);
  }

  async getAll(router:string):Promise<T | Observable<T>>{
    return this.http.get<T>(CrudBaseService.BASE_URL + router);
  };

  async getById(id:number | string, router:string):Promise<T | Observable<T>>{
    return this.http.get<T>(CrudBaseService.BASE_URL + router + '/' + id);
  };

  async update(id:number | string, router:string, type:T):Promise<T | Observable<T>>{
    return this.http.put<T>(CrudBaseService.BASE_URL + router  + '/' + id, type);
  };

  async delete(id:number | string,router:string):Promise<T | Observable<T>>{
    return this.http.delete<T>(CrudBaseService.BASE_URL + router + '/' + id);
  };

  listSize():number{
    return this.listSize.length;
  };

}
