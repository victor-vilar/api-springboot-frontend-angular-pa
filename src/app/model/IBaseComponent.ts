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
  listOfItens:string[];

  getAllFromApi():Promise<T | Observable<T>>;

}
