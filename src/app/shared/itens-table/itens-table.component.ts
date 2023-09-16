import { Customer } from 'src/app/shared/entities/Customer';

import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MapperService } from 'src/app/shared/services/mapper.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Mapper } from '../interfaces/mapper.mapper';

@Component({
  selector: 'app-itens-table',
  templateUrl: 'itens-table.component.html',

})
export class ItensTableComponent implements OnInit, OnDestroy{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchedValue:string ='';
  dataSource = new MatTableDataSource<any>();

  //header of the data sended by component
  @Input()
  tableHeaders:string[] = [];

  // data that will fill the table
  @Input()
  tableData:any = [];

  //model to fill the header tag
  @Input()
  model:string='';

  @Input()
  fatherPathPrefix:any;

  @Input()
  customerId:string;

  @Input()
  columnCount:number;

  @Input()
  service:any;

  @Input()
  mapper:Mapper;

  private subscription$:Subscription;
  private refreshUnsubscribe:Subscription;

  constructor(private router:Router,
    private dialogService:DialogServiceService,) { }

  ngOnDestroy(): void {

    //unsubscribe to
    if(this.subscription$ !== undefined){
      this.subscription$.unsubscribe();
    }

    if(this.refreshUnsubscribe !== undefined){
      this.refreshUnsubscribe.unsubscribe();
    }

  }


  ngOnInit(): void {

    let observable$ = this.service.refreshAllData();
    this.refreshUnsubscribe = observable$.subscribe(this.onInitObserver())

    this.getAll();
  }



  //delete item
  deleteItem(event:any){



    //creating dialog progress bar
    this.dialogService.openProgressDialog();

    //creating observable variable
    let observable$;

    //if the event object cpfCnpj is undefined it means it is not a 'Customer' object
    //the customer object cpfCnpj it is its id;
    if (event.cpfCnpj !== undefined){
      observable$ = this.service.delete(event.cpfCnpj);
    }else{
      observable$ = this.service.delete(event.id)
    }

    observable$.subscribe(value =>{
      this.dialogService.closeProgressSpinnerDialog();
    })
  }


  //putting a option parameter to use on customer address, contracts and supervisors list
  getAll(){

    if(this.customerId !== undefined){

      //cleaning the list to not have duplicated data
      this.tableData = [];

      //subscribing to the service
      this.subscription$ = this.service.getAllByCustomerId(this.customerId)
      .subscribe(response =>{

          //map the itens to the table
          this.tableData = this.mapper.mapItens(response);

          //pass the data to data source component
          this.updateDataSource();

      });

    }else{
      this.service.getAll();
    }
  };

  filteredTableData(event:Event){

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  //obersver used on onInit method
  onInitObserver():any {
    return {
      next:(response) =>{
          this.tableData = response;
          this.updateDataSource();
      },
      error:(error) =>{
        console.log(error);
      }
    }
  }


  //open confirmation dialog
  openDialog(object:any){

    let observable$ = this.dialogService.openConfirmationDialog();
    observable$.subscribe(response =>{
      if(response){
        this.deleteItem(object);
      }
    })

  }

  @Output()
  editObjectEmitter = new EventEmitter<any>()
  sendObjectToEdit(object:any){
    this.editObjectEmitter.emit(object);
  }



  //update datasource from subclasses table view
  updateDataSource(){
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
  }


}
