import { Router } from '@angular/router';
import { ApplicationUser } from './shared/entities/ApplicationUser';
import { LoginService } from './login/services/login.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private renderer:Renderer2, private loginService:LoginService, private router:Router){};

  @ViewChild('menu') menuContainer?:ElementRef;
  @ViewChild('main') mainContainer?:ElementRef;
  menuSmall = false;
  loggedUser:boolean = false;

  ngOnInit(): void {

    //if the brownser already have an user in window session
    if(this.loginService.getUserFromBrownser() != undefined && this.loginService.getUserFromBrownser() != null){
      this.loggedUser = true
      this.afterLoginIn();
    }

    this.loginService.subscribeToLoginUser()
    .subscribe(loggedUser =>{
      this.loggedUser = loggedUser
      this.afterLoginIn();
    });
}

  private afterLoginIn(){
    this.menuSmall = true;
    this.toggling();
  }


  //template functions
  toggling(){

    if(this.menuSmall){
      this.menuContainer?.nativeElement.classList.add('menu-small');
      this.menuContainer?.nativeElement.classList.remove('menu');

    }else{
      this.menuContainer?.nativeElement.classList.add('menu');
      this.menuContainer?.nativeElement.classList.remove('menu-small');
    }

    setTimeout(() => {
      this.menuSmall = !this.menuSmall;
    },200);


  }

  closeFromMenu(option:boolean){
    this.menuSmall = option;
    this.toggling();
  }


}
