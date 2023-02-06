import { Component, Input, OnInit } from '@angular/core';

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

  //array to save the selected rows
  selectedItens:any[] = [];

  constructor() { }
  ngOnInit(): void {

  }

  //transform the objects into a array of values to fill the table rows
  transformObjectInArrayOfValues(object:any){
    return Object.values(object);
  }

  //get the selected row to do the operations of delete, update etc.
  selectItem(event:any,object:any){
    if(event.target.checked){
      this.selectedItens.push(object);
    }else{
      this.selectedItens = this.selectedItens.filter(obj => obj !== object);
    }
  }

}
