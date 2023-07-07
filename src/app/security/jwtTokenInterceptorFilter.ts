import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class jwtTokenInterceptorFilter implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    let csrfCookie = window.sessionStorage.getItem('cookieDoBack');

    if(csrfCookie){
        req.headers.append('X-XSRF-TOKEN',csrfCookie);
    }


    return next.handle(req);
  }
}
