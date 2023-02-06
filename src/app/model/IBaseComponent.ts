import { Observable } from "rxjs";

// interface criada para ser implementada pelos componentes que representam os modelos do projeto.
export interface IBaseComponent<T>{

  //model name representation
  title:string;
  //links of crud operations
  pathToOperations:string[];
  //header of the view table
  headerForTables:string[];
  //itens of component
  listOfItens:T[];


  //get selected itens
  addSelectTedItens(list:any):void;
  //store selected itens of the itens-table
  selectedItens:any[];


  //Crud Methods
  //get all objets
  getAllFromApi():void;
  //get object by id;
  getById():void;
  //delete selected itens. Event get by crud-menu
  deleteFromApi():void
  //update in database
  updateFromApi():void;
}
