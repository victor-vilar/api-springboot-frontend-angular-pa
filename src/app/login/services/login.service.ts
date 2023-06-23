import { Observable } from 'rxjs';
import { ApplicationUser } from './../../shared/entities/ApplicationUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private BASE_URL = "http://localhost:8080/login-page"

  login(applicationUser: ApplicationUser):Observable<HttpResponse<ApplicationUser>>{
    let headers = this.createHeaders(applicationUser);
    return this.http.get<ApplicationUser>(this.BASE_URL,{headers:headers, observe:'response', withCredentials:true});
  }


  private createHeaders(applicationUser:ApplicationUser): HttpHeaders{
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(applicationUser.username + ":" + applicationUser.password)

    })
  };

  }

