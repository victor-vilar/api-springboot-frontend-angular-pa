import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { LoginService } from './../../login/services/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicationUser } from 'src/app/shared/entities/ApplicationUser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {



  applicationUser:ApplicationUser;
  username:string;
  role:string[];
  photo:string;

  constructor(private loginService:LoginService,private dialogService:DialogServiceService) { }

  ngOnInit(): void {
    console.log("iniciei")
    this.applicationUser = this.loginService.applicationUser;
  }

  @Output()
  closeMenuFromFatherEmitter:EventEmitter<boolean> = new EventEmitter<boolean>();

  closeMenuFromFather(){
    this.closeMenuFromFatherEmitter.emit(true);
  }

  logout(){

    this.dialogService.openConfirmCloseDialog("Deseja sair da aplicação ?")
    .subscribe(response =>{
      if(response){
        this.loginService.logout();
      }
    })



  }

}
