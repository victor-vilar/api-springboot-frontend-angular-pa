import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



export interface OnComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveService implements CanDeactivate<OnComponentDeactivate>  {

  constructor() { }
  canDeactivate(component: OnComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate();
  }
}
