import { EquipamentsService } from './../../services/equipaments.service';
import { Component, OnInit } from '@angular/core';
import { IBaseComponent } from 'src/app/model/IBaseComponent';
import { Equipament } from 'src/app/model/Equipament';

@Component({
  selector: 'app-equipaments',
  templateUrl: './equipaments.component.html',
  styleUrls: ['./equipaments.component.css']
})
export class EquipamentsComponent implements OnInit, IBaseComponent<Equipament> {

  //Default Methods
  constructor(private service:EquipamentsService) { }
  ngOnInit(): void {
      this.getAllFromApi();
  }

  //IBaseComponents interface properties
  title='Equipamentos'
  pathToOperations = [];
  headerForTables = ['Id','Equipamento','Volume em M³','Selecionar']
  listOfItens:any = [];
  //---------------------

  //Properties to Crud Operations
  selectedItens:any[] =[];
  //---------------------

  //get the itens selected from itens table
  addSelectTedItens(list:any){
    this.selectedItens = list;
  }
  //---------------------

  getAllFromApi() {
    this.service.getAllEquipaments()
    .subscribe(next=>{
      this.listOfItens = next;
      console.log(this.listOfItens);
    });
  }

  getById(){
    this.service.getEquipamentById(1)
    .subscribe(next=> next.equipamentName);
  }

    //delete selected itens
    deleteFromApi(){
      if(this.selectedItens.length > 0){
        if(confirm('Deseja excluir esse(s) ' + this.title + ' ?')){

          this.selectedItens.forEach(e =>{
            this.service.deleteEquipmentById(e.id)
            .subscribe(value =>{
                        this.service.getAllEquipaments()
                        .subscribe(next=>{
                          this.listOfItens = next;
                        });
            });
          });
        };

      }
      else{
        console.log('É preciso selecionar um item')
      }
    }


    updateFromApi(){

    }

}

