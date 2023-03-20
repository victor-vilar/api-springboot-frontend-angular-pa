import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { AddressService } from './../../../services/address.service';
import { CrudBaseService } from 'src/app/services/crudbase.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { ContractsService } from 'src/app/services/contracts.service';
import { MapperService } from 'src/app/services/mapper.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.css']
})
export class ItensTableComponent implements OnInit, OnChanges{

  searchedValue:string ='';

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
  columnCount:number;

  @Input()
  service:any;

  constructor(private router:Router,
    private mapper:MapperService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    let observable$ = this.service.refreshAllData();
    observable$.subscribe(this.onInitObserver());
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

      let observable$

      if(this.fatherPathPrefix === 'contrato'){
        observable$ = this.service.getContractByCustomerId(this.customerId);
      }

      if(this.fatherPathPrefix === 'endereco'){
        observable$ = this.service.getAllAddressByCustomerId(this.customerId);
      }

      if(this.fatherPathPrefix === 'fiscal'){
        observable$ = this.service.getAllSupervisorsByCustomerId(this.customerId);
      }

      observable$.subscribe(this.getAllByCustomerIdObserver());

    }else{
      this.service.getAll();
    }

  };

  //used to inform the keyvalue pipe to not sort the object
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

  //observer to be used on address, contracts and supervisors list
  getAllByCustomerIdObserver():any{
    return {
      next:(response) =>{

        if(this.fatherPathPrefix === 'contrato'){
          this.tableData = this.mapper.toItensTableContractMapper(response);
        }

        if(this.fatherPathPrefix === 'endereco'){
          this.tableData = this.mapper.toItensTableAddressMapper(response);
        }

        if(this.fatherPathPrefix === 'fiscal'){
          this.tableData = this.mapper.toSupervisorsMapper(response);
        }

        this.filteredTableDataList = this.tableData.slice();
      },
      error:(err)=>{
        console.log(err);
      }
    }
  }

  //obersver used on onInit method
  onInitObserver():any {
    return {
      next:(response) =>{
          this.tableData = response;
          this.filteredTableDataList = this.tableData.slice();
      },
      error:(error) =>{
        console.log(error);
      }
    }
  }


  //open confirmation dialog
  openDialog(object:any){

    let dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {data:{object:object}});

    dialogRef.afterClosed().subscribe(response =>{
      if(response) {
        this.deleteItem(response);
      }
    })

  }

  @Output()
  editObjectEmitter = new EventEmitter<any>()
  sendObjectToEdit(object:any){
    this.editObjectEmitter.emit(object);
  }


}
