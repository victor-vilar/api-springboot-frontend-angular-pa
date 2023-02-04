import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  title='Clients';

  // informações para componente de crud-menu
  pathToOperations:string[] = [];
  // ------------------------------------------

  // informações para o componente itens-table
  headerForTables = [
    'CPF/CNPJ','Nome/Razão Social'
  ]

  ClientsList:string[] = [];
  // ------------------------------------------

  constructor() { }
  ngOnInit(): void {
  }

}
