import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LoginService } from '../login/services/login.service';

@Injectable()
export class csrfTokenInterceptorFilter implements HttpInterceptor {

  constructor(private loginService:LoginService){}


  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    const token = this.loginService.getCsrfToken();

    if(token !== null){
      let reqClone = req.clone({setHeaders:{'X-XSRF-TOKEN': token}})
      return next.handle(reqClone);
    }


    return next.handle(req);
  }
}
