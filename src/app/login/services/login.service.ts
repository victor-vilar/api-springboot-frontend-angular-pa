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


/**
 *make login
 * @param applicationUser
 */
  login(applicationUser: ApplicationUser){


    //method to fake a login,
    //this.makeFakeLogin();



     this.dialogService.openProgressDialog();
     let headers = this.createHeaders(applicationUser);
     this.http.get<ApplicationUser>(this.BASE_URL,{headers:headers, observe:'response',withCredentials:true})
     .subscribe(this.createLoginObserver());
  }

/**
 * do logout and
 * clear the window storaged
 */
  logout(){
    window.sessionStorage.clear();
    this.applicationUser = null;
    this.logginObserver.next(false);
    this.router.navigate(['/login']);
  }

/**
 *  creates a header with a basic authentication
 * @param applicationUser object
 * @returns httpHeader with an basic authentication
 */
  private createHeaders(applicationUser:ApplicationUser): HttpHeaders{
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(applicationUser.username + ":" + applicationUser.password)
    })
  };

  /**
   * get jwt token stored inside session storage
   * @returns jwt token or undefined
   */

  public getJwtToken():string{
    return window.sessionStorage.getItem("jwtToken");
  }

  /**
   * get the csrf token stored inside session storage
   * @returns csrf token or undefined
   */
  public getCsrfToken():string{
    return window.sessionStorage.getItem("XSRF");
  }


  /**
   * make a fake login to test frontend and make alterations without the needed of login
   */
  private makeFakeLogin(){
    this.applicationUser = {username:"fake",roles:['ADMIN'],profilePhotoUrl:''}
    this.logginObserver.next(true);
    this.router.navigate(['dashboard'])
  }

  /**
   * get application user from brows session storage
   * @returns this applicationUser instance or undefined ;
   */
  public getUserFromBrownser():ApplicationUser{
    this.applicationUser = window.sessionStorage.getItem('loggedUser');
    console.log(this.applicationUser);
    return this.applicationUser;
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

