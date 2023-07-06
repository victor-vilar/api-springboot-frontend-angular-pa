import { Subject } from 'rxjs';
import { DialogServiceService } from './../../shared/services/dialog-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationUser } from './../../shared/entities/ApplicationUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  applicationUser = null;
  private BASE_URL = "http://localhost:8080/v1/login";

  constructor(private http:HttpClient,
     private router:Router,
     private dialogService:DialogServiceService ) { }


     private logginObserver:Subject<boolean> = new Subject<boolean>;
     subscribeToLoginUser(){
      return this.logginObserver.asObservable();
     }



  login(applicationUser: ApplicationUser){
    this.dialogService.openProgressDialog();
    let headers = this.createHeaders(applicationUser);
    this.http.get<ApplicationUser>(this.BASE_URL,{headers:headers, observe:'response',withCredentials:true})
    .subscribe(this.createLoginObserver());
  }


  logout(){
    window.sessionStorage.clear();
    this.applicationUser = null;
    this.logginObserver.next(false);
    this.router.navigate(['/login'])
  }


  private createHeaders(applicationUser:ApplicationUser): HttpHeaders{
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(applicationUser.username + ":" + applicationUser.password)
    })
  };


  //TODO GET JWT TOKEN FROM BACKEND
  private createLoginObserver(){
    return {
      next:(response) =>{
        this.dialogService.closeProgressSpinnerDialog();
        this.applicationUser = response.body;
        window.sessionStorage.setItem('loggedUser',JSON.stringify(response.body))
        this.logginObserver.next(true);
        this.router.navigate(['/dashboard'])
      },
      error:(error) => {
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openErrorDialog(error.message);
        throw Error(error.message);

      }
    }
  }

  }

