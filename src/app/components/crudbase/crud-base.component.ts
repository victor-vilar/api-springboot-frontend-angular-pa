import { Component, Inject, OnInit } from '@angular/core';
import { CrudBaseService } from 'src/app/services/crudbase.service';


@Component({
  selector: 'app-CrudBase',
  templateUrl: './crud-base.component.html',
  styleUrls: ['./crud-base.component.css'],
  providers:[]
})

/**
 * Component base for the crud components. It has the basic properties to do all the need operations of the project
 */
export abstract class CrudBaseComponent<T extends CrudBaseService<any>> implements OnInit {

  //component that is going to be manipulated
  protected title:string=''
  // am i gonna need it ?
  protected pathToOperations:any = [];
  //headers for the iten-table  table view
  protected headerForTables:any = []
  //list of itens that comes from service
  protected listOfItens:any = [];
  //---------------------

  //constructor
  constructor(@Inject(String) private rota:string, @Inject(CrudBaseService)private service:T) { }
  ngOnInit() {
  }
  //----------------------


  //methods
  protected getAllFromApi() {
    this.service.getAll(this.rota)
    .subscribe(next=>{
      this.listOfItens = next;
    });
  }

  //get a item from list, need to open dialog for update the item
  protected getById(){
    this.service.getById(1,this.rota)
    .subscribe(next=> next);
  }

  //delete item from API
  protected delete(obj:any){
      this.service.delete(obj.id,this.rota)
      .subscribe(next => {
        this.service.getAll(this.rota)
        .subscribe(next=> this.listOfItens = next);
      })
  }

  //save item in api
  protected save(obj:any){
    this.service.save(obj,this.rota)
    .subscribe(next => {
      this.service.getAll(this.rota)
      .subscribe(next => this.listOfItens = next);
    })
  }




}
