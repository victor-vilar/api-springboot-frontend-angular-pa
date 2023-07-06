import { LoginService } from './../../login/services/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {




  userName:string;
  userRole:string;
  userPhoto:string;

  constructor(private loginService:LoginService) { }
  ngOnInit(): void {
  }

  @Output()
  closeMenuFromFatherEmitter:EventEmitter<boolean> = new EventEmitter<boolean>();

  closeMenuFromFather(){
    this.closeMenuFromFatherEmitter.emit(true);
  }

  logout(){
    this.loginService.logout()
    //this.closeMenuFromFather()
  }

}
