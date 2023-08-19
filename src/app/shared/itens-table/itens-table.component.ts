
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MapperService } from 'src/app/shared/services/mapper.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';

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
    private dialogService:DialogServiceService,) { }

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
    this.dialogService.openProgressDialog();
    this.service.delete(event.id)
    .subscribe(value =>{
      this.getAll();
      this.dialogService.closeProgressSpinnerDialog();
    })
  }


  //putting a option parameter to use on customer address, contracts and supervisors list
  getAll(){

    if(this.customerId !== undefined){

      this.tableData = [];
      this.filteredTableDataList = [];

      let observable$;
      observable$ = this.service.getAllByCustomerId(this.customerId);
      observable$.subscribe(response =>{

        this.tableData = this.service.mapItens(response);
        this.filteredTableDataList = this.tableData.slice();
      });

    }else{
      this.service.getAll();
    }
  };


  //used to inform the keyvalue pipe to not sort the object properties
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


}
