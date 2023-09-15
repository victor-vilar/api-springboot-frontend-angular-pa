import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subject, switchMap } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable(
  {providedIn: 'root',}
)
export abstract class CrudBaseService<T>{


  private refreshRequired = new Subject<any>();
  static BASE_URL:string = environment.LOCAL_API_URL;
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
    return  this.http.post<T>(CrudBaseService.BASE_URL + this.rota,type,{withCredentials:true});
  }

  getAll(){
    this.http.get<T[]>(CrudBaseService.BASE_URL + this.rota,{withCredentials:true})
    .subscribe(value => {
      this.list = value;
      this.send(this.list)
    });
  };


  getById(id:number | string):Observable<T>{
    return this.http.get<T>(CrudBaseService.BASE_URL + this.rota + '/' + id,{withCredentials:true});
  };

  update(type:T):Observable<T>{
    return this.http.put<T>(CrudBaseService.BASE_URL + this.rota, type,{withCredentials:true});
  };

  delete(id:number | string):Observable<T>{
    return this.http.delete<T>(CrudBaseService.BASE_URL + this.rota + '/' + id,{withCredentials:true});
  };


}
