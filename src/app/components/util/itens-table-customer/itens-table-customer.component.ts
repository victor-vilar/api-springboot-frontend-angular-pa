import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-itens-table-customer',
  templateUrl: './itens-table-customer.component.html',
  styleUrls: ['./itens-table-customer.component.css']
})
export class ItensTableCustomerComponent implements OnInit {

  //header of the data sended by component
  @Input()
  tableHeaders:string[] = [];

  @Input()
  fatherUrl:string;
  // data that will fill the table
  @Input()
  tableData:any = [];
  filteredTableDataList:any = [];
  //model to fill the header tag
  @Input()
  model:string='';

  @Input()
  fatherPathPrefix:any;

  searchedValue:string;

  @Input()
  service:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
      this.service.refreshAllData()
      .subscribe(value =>{
        this.tableData = value
        this.filteredTableDataList = this.tableData.slice();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAll();
  }

  //transform the objects into a array of values to fill the table rows
  transformObjectInArrayOfValues(object:any){
    console.log(object);
    return Object.values(object);
  }

  //get the selected row to do the operations of delete, update etc.
  deleteItem(event:any){
    this.service.delete(event.cpfCnpj,this.fatherUrl)
    .subscribe(value =>{
      this.getAll();
    })
  }

  getAll(){
    this.service.getAll(this.fatherUrl);
  };

  findAliasInHeaderForTableArray(key:any){
    let list = Object.entries(this.tableData);
    list.filter(e =>{
      console.log(Object.entries(e));
    })

  }

  filteredTableData(){
    this.filteredTableDataList = this.tableData.filter(element => {
      if(Object.values(element).toString().toLowerCase().includes(this.searchedValue)){
        return element;
      }
    });
  }

  returnZero() {
    return 0;
  }


}
