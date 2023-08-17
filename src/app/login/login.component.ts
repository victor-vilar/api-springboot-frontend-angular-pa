import { DialogServiceService } from './../shared/services/dialog-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './services/login.service';
import { ApplicationUser } from '../shared/entities/ApplicationUser';
import { getCookie } from 'typescript-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('meuForm') formulario:NgForm;


  constructor(private loginService:LoginService,
     private router:Router,
     private dialogService:DialogServiceService) { }


  ngOnInit(): void {
    if(window.sessionStorage.getItem("loggedUser")){
      this.router.navigate(["/dashboard"]);
    }
  }

  logar(){
    this.loginService.login(this.createsApplicationUser());
  }

  createsApplicationUser():ApplicationUser{


    if(this.formulario.value.username === "" || this.formulario.value.password === ""){
      this.dialogService.openErrorDialog('Os campos de usuario e senha não podem estar vazios !');
      throw Error("username and password fields can't be null")
    }

    return {
      username: this.formulario.value.username,
      password: this.formulario.value.password
    }

  }






}
