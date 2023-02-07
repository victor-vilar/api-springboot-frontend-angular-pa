import { Component, Inject, OnInit } from '@angular/core';
import { CrudBaseService } from 'src/app/services/crudbase.service';


@Component({
  selector: 'app-CrudBase',
  templateUrl: './crud-base.component.html',
  styleUrls: ['./crud-base.component.css'],
  providers:[]
})

export abstract class CrudBaseComponent<T extends CrudBaseService<any>> implements OnInit {

  //IBaseComponents interface properties
  protected title:string=''
  protected pathToOperations:any = [];
  protected headerForTables:any = []
  protected listOfItens:any = [];
  //---------------------

  //Properties to Crud Operations
  protected selectedItens:any[] =[];
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
      console.log(this.listOfItens);
    });
  }

  protected getById(){
    this.service.getById(1,this.rota)
    .subscribe(next=> next);
  }

  protected delete(){
    this.selectedItens.forEach(e =>{
      this.service.delete(e.id,this.title.toLowerCase())
      .subscribe(next => {
        this.service.getAll(this.title.toLowerCase())
        .subscribe(next=> this.listOfItens = next);
      })
    })
  }


}
