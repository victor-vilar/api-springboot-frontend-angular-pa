import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class CrudBaseService<T>{

  static BASE_URL:string = "http://localhost:8080/";
  private list:T[] = [];

  constructor(private http:HttpClient){

  }

   protected save(type:T,router:string):Observable<T>{
    return  this.http.post<T>(CrudBaseService.BASE_URL + router,type);
  }

  protected getAll(router:string):Observable<T>{
    return this.http.get<T>(CrudBaseService.BASE_URL + router);
  };

  protected  getById(id:number | string, router:string):Observable<T>{
    return this.http.get<T>(CrudBaseService.BASE_URL + router + '/' + id);
  };

  protected  update(id:number | string, router:string, type:T):Observable<T>{
    return this.http.put<T>(CrudBaseService.BASE_URL + router  + '/' + id, type);
  };

  protected delete(id:number | string,router:string):Observable<T>{
    return this.http.delete<T>(CrudBaseService.BASE_URL + router + '/' + id);
  };

  listSize():number{
    return this.list.length;
  };

}
