import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/model/IBaseComponent';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, IBaseComponent {


  title='Clientes';
  pathToOperations = [];
  headerForTables = ['CPF/CNPJ','Nome/Razão Social', "Selecionar"]
  listOfItens = [];


  constructor() { }
  ngOnInit(): void {
  }

}
