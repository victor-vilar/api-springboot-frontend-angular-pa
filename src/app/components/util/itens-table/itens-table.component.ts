import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.css']
})
export class ItensTableComponent implements OnInit {


  //header of the data sended by component
  @Input()
  tableHeaders:string[] = [];

  // data that will fill the table
  @Input()
  tableData:any;

  //model to fill the header tag
  @Input()
  model:string='';

  @Input()
  fatherPathPrefix:any;
  //emitter to send data to father if something get in or out the array
  @Output()
  selectedItensEmitter:EventEmitter<any> = new EventEmitter<any>();

  constructor(private router:Router) { }
  ngOnInit(): void {

  }

  //transform the objects into a array of values to fill the table rows
  transformObjectInArrayOfValues(object:any){
    return Object.values(object);
  }

  //get the selected row to do the operations of delete, update etc.
  deleteItem(event:any){
    this.selectedItensEmitter.emit(event);
  }

  editItem(object:any){
    this.router.navigate(['equipamento/'])
  }



}
