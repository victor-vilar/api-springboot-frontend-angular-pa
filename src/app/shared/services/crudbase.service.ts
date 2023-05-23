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
  rota:string;
  constructor(protected http:HttpClient){ }


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

  save(type:T):Observable<T>{
    return  this.http.post<T>(CrudBaseService.BASE_URL + this.rota,type);
  }

  getAll(){
    this.http.get<T[]>(CrudBaseService.BASE_URL + this.rota)
    .subscribe(value => {
      this.list = value;
      this.send(value)
    });
  };


  getById(id:number | string):Observable<T>{
    return this.http.get<T>(CrudBaseService.BASE_URL + this.rota + '/' + id);
  };

  update(id:number | string, type:T):Observable<T>{
    return this.http.put<T>(CrudBaseService.BASE_URL + this.rota  + '/' + id, type);
  };

  delete(id:number | string):Observable<T>{
    return this.http.delete<T>(CrudBaseService.BASE_URL + this.rota + '/' + id);
  };


}
