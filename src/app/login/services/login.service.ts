import { Subject } from 'rxjs';
import { DialogServiceService } from './../../shared/services/dialog-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationUser } from './../../shared/entities/ApplicationUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { getCookie } from 'typescript-cookie';

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


    //method to fake a login,
    //this.makeFakeLogin();



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

  public getJwtToken():string{
    return window.sessionStorage.getItem("jwtToken");
  }

  public getCsrfToken():string{
    return window.sessionStorage.getItem("XSRF");
  }

  private makeFakeLogin(){
    this.applicationUser = {username:"fake",roles:['ADMIN'],profilePhotoUrl:''}
    this.logginObserver.next(true);
    this.router.navigate(['dashboard'])
  }

/**
 * method to return a observer that going to be used at subscribe of http.get
 * @returns a observer
 */
  private createLoginObserver(){
    return {
      next:(response) =>{
        //closing progress spinner
        this.dialogService.closeProgressSpinnerDialog();
        //getting application user from respose.body
        this.applicationUser = response.body;
        //setting user info
        window.sessionStorage.setItem('loggedUser',JSON.stringify(response.body))
        //setting jwt token
        window.sessionStorage.setItem('jwtToken',response.headers.get('Authorization'))
        //setting csrf token
        let xsrf = getCookie('XSRF-TOKEN')
        window.sessionStorage.setItem('XSRF', xsrf )
        //send observable signal
        this.logginObserver.next(true);
        //navigating to dashboard
        this.router.navigate(['dashboard'])
      },
      error:(error) => {
        //closing progress sprinner
        this.dialogService.closeProgressSpinnerDialog();
        //show dialog with error message and error code
        this.dialogService.openErrorDialog(error.code + " : " +error.message);
        throw Error(error.message);

      }
    }
  }

  }

