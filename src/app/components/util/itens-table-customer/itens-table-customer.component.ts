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

  //model to fill the header tag
  @Input()
  model:string='';

  @Input()
  fatherPathPrefix:any;


  @Input()
  service:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
      this.service.refreshAllData()
      .subscribe(value =>
        this.tableData = value);
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
    this.service.delete(event.id,this.fatherUrl)
    .subscribe(value =>{
      this.getAll();
    })
  }

  getAll(){
    this.service.getAll(this.fatherUrl);
  };


}
