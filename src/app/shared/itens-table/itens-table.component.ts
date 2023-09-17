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

    //subscribing to service list updating
    let observable$ = this.service.refreshAllData();

    //add observable to a subscription object, and adding the overserver
    this.refreshUnsubscribe = observable$.subscribe(this.afterReturnListObserver())

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

    //if the customerId is not undefined, i will use the getAllByCustomerId from the service
    if(this.customerId !== undefined){

      //cleaning the list to not have duplicated data
      this.tableData = [];

      //get all the T object from service by customer id
      this.subscription$ = this.service.getAllByCustomerId(this.customerId)
      .subscribe(this.afterReturnListObserver());

    //if the customerId is null, so it is searching by all T object
    }else{
      this.service.getAll();
    }
  };

  //table filter
  filteredTableData(event:Event){

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  //obersver when receive the data
  afterReturnListObserver():any {
    return {
      next:(response) =>{

        //if the list of iten has the need to be mapped, the father will pass the Map service
        //and will use its method 'mapItens' to transform the list
        if(this.mapper != undefined){
          this.tableData = this.mapper.mapItens(response);

        //if there is no need to transform it will only set the variable
        }else{
          this.tableData = response;
        }

        //updating data source for the mat-table
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
