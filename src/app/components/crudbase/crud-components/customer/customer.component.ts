import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/Customer';
import { IBaseComponent } from 'src/app/model/IBaseComponent';

@Component({
  selector: 'app-client',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  title='Clientes';
  pathToOperations = [];
  headerForTables = ['CPF/CNPJ','Nome/Razão Social', "Selecionar"]
  listOfItens = [];


  constructor() { }
  getAllFromApi():Observable<Customer> {
    throw new Error('Method not implemented.');
  }
  getById(){

  }
  ngOnInit(): void {
  }

}
