import { DialogServiceService } from './../shared/services/dialog-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './services/login.service';
import { ApplicationUser } from '../shared/entities/ApplicationUser';
import { getCookie } from 'typescript-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('meuForm') formulario:NgForm;


  constructor(private loginService:LoginService, private dialogService: DialogServiceService) { }

  usuarioLogado;

  ngOnInit(): void {
        console.log(getCookie('XSRF-TOKEN'));
        window.sessionStorage.setItem('cookieDoBack',getCookie('XSRF-TOKEN'))
  }

  logar(){
    this.dialogService.openProgressDialog();
    let applicationUser = this.createsApplicationUser();
    this.loginService.login(applicationUser).subscribe(this.createLoginObserver());

  }

  createsApplicationUser():ApplicationUser{
    return {
      username: this.formulario.value.username,
      password: this.formulario.value.password
    }
  }


  createLoginObserver(){
    return {
      next:(response) =>{

        this.usuarioLogado = response.body;
        this.dialogService.openSucessDialog("sucesso","/dashboard");
        this.dialogService.closeProgressSpinnerDialog();
      },
      error:(response) => {
        this.dialogService.openErrorDialog(response.message);
        this.dialogService.closeProgressSpinnerDialog();
      },
    }
  }

}
