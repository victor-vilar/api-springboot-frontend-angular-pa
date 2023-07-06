import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
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

  constructor(private loginService:LoginService,private dialogService:DialogServiceService) { }
  ngOnInit(): void {
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
