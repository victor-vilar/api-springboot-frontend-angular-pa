import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subject, switchMap } from "rxjs";

@Injectable(
  {providedIn: 'root',}
)
export abstract class CrudBaseService<T>{


  private refreshRequired = new Subject<any>();
  static BASE_URL:string = "http://localhost:8080/";
  list:T[] = [];
  constructor(private http:HttpClient){ }


  // refreshRequiredValue():Observable<any>{
  //   return this.refreshRequired.asObservable();
  // }
  refreshAllData(){
    return this.refreshRequired.asObservable();
  }

  send(object:any){
      this.refreshRequired.next(object);
  }

  sendNull(){
    this.refreshRequired.next(this.list);
  }

  save(type:T,router:string):Observable<T>{
    return  this.http.post<T>(CrudBaseService.BASE_URL + router,type);
  }

  getAll(router:string){
   return this.http.get<T[]>(CrudBaseService.BASE_URL + router)
   .subscribe(value => this.send(value));
  };


  getById(id:number | string, router:string):Observable<T>{
    return this.http.get<T>(CrudBaseService.BASE_URL + router + '/' + id);
  };

  update(id:number | string, router:string, type:T):Observable<T>{
    return this.http.post<T>(CrudBaseService.BASE_URL + router  + '/' + id, type);
  };

  delete(id:number | string,router:string):Observable<T>{
    return this.http.delete<T>(CrudBaseService.BASE_URL + router + '/' + id);
  };

  // listSize():number{
  //   return this.list.length;
  // };

}
