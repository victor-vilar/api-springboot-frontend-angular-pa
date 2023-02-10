import { CrudBaseService } from 'src/app/services/crudbase.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.css']
})
export class ItensTableComponent implements OnInit, OnChanges{


  //header of the data sended by component
  @Input()
  tableHeaders:string[] = [];

  @Input()
  fatherUrl:string;
  // data that will fill the table
  @Input()
  tableData:any;

  //model to fill the header tag
  @Input()
  model:string='';

  @Input()
  fatherPathPrefix:any;


  @Input()
  service:any;

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAll();
  }

  //transform the objects into a array of values to fill the table rows
  transformObjectInArrayOfValues(object:any){
    return Object.values(object);
  }

  //get the selected row to do the operations of delete, update etc.
  deleteItem(event:any){
    this.service.delete(event.id,this.fatherUrl)
    .subscribe(value =>
      this.getAll());
  }

  getAll(){
    console.log('on changes')
    console.log(this.tableData);
    this.service.getAll(this.fatherUrl)
    .subscribe(value => {
      this.tableData = value;
      console.log(this.tableData);});

  }

  // editItem(object:any){
  //   this.router.navigate(['equipamento/'])
  // }




}
