import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/model/Client';
import { IBaseComponent } from 'src/app/model/IBaseComponent';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, IBaseComponent<Client> {


  title='Clientes';
  pathToOperations = [];
  headerForTables = ['CPF/CNPJ','Nome/Razão Social', "Selecionar"]
  listOfItens = [];


  constructor() { }
  getAllFromApi(): Promise<Client | Observable<Client>> {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
  }

}
