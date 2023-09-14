import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItensTableComponent } from 'src/app/shared/itens-table/itens-table.component';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-contracts-list-table',
  templateUrl: './contracts-list-table.component.html',
  styleUrls: ['./contracts-list-table.component.css']
})
export class CustomerContractsListTableComponent extends ItensTableComponent implements OnInit {



  
  constructor(router:Router,
    mapper:MapperService,
    dialogService:DialogServiceService){
      super(router,mapper,dialogService)
    }


  ngOnInit(): void {
    let observable$ = this.service.refreshAllData();
    observable$.subscribe(this.onInitObserver())
  }

}
