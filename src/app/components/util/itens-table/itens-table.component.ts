import { AddressService } from './../../../services/address.service';
import { CrudBaseService } from 'src/app/services/crudbase.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.css']
})
export class ItensTableComponent implements OnInit, OnChanges{

  searchedValue:string;

  //header of the data sended by component
  @Input()
  tableHeaders:string[] = [];

  // data that will fill the table
  @Input()
  tableData:any = [];
  filteredTableDataList:any;
  //model to fill the header tag
  @Input()
  model:string='';

  @Input()
  fatherPathPrefix:any;

  @Input()
  customerId:string;

  @Input()
  service:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
      this.service.refreshAllData()
      .subscribe(value =>{
        this.tableData = value
        this.filteredTableDataList = this.tableData.slice()
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAll();
  }

  findAliasInHeaderForTableArray(key:any){
    return this.tableHeaders[key];
  }

  //get the selected row to do the operations of delete, update etc.
  deleteItem(event:any){
    this.service.delete(event.id)
    .subscribe(value =>{
      this.getAll();
    })
  }
  //putting a option parameter to use on customer address, contracts and supervisors list
  getAll(){

    if(this.customerId !== undefined){


      if(this.fatherPathPrefix === 'contrato'){
        let observable$ = this.service.getContractByCustomerId(this.customerId);
        observable$.subscribe(this.getAllByCustomerIdObserver());
      }

      if(this.fatherPathPrefix === 'endereco'){
        let observable$ = this.service.getAllAddressByCustomerId(this.customerId);
        observable$.subscribe(this.getAllByCustomerIdObserver());
      }



    }else{
      this.service.getAll();
    }

  };

  returnZero() {
    return 0;
  }

  filteredTableData(){
    this.filteredTableDataList = this.tableData.filter(element => {
      if(Object.values(element).toString().toLowerCase().includes(this.searchedValue.toLocaleLowerCase())){
        return element;
      }
    });
  }

  //observer to be used on customer address, contracts and supervisors list
  getAllByCustomerIdObserver():any{
    return {
      next:(response) =>{
        console.log(response);
        this.service.send(response);
      },

      error:(err)=>{
        console.log(err);
      }
    }
  }





}
