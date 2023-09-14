import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { Observable } from 'rxjs';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapperService } from 'src/app/shared/services/mapper.service';


@Component({
  selector: 'app-customer-list-table',
  templateUrl: './customer-list-table.component.html',
  styleUrls: ['./customer-list-table.component.css']
})
export class CustomerListTableComponent extends ItensTableComponent implements OnInit {

  constructor(router:Router,mapper:MapperService,dialogService:DialogServiceService){
    super(router,mapper,dialogService)
  }

  ngOnInit(): void {
    let observable$ = this.service.refreshAllData();
    observable$.subscribe(this.onInitObserver())
    this.getAll();
  }

}
