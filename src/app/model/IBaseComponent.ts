// interface criada para ser implementada pelos componentes que representam os modelos do projeto.
export interface IBaseComponent{

  //model name representation
  title:string;

  //links of crud operations
  pathToOperations:string[];

  //header of the view table
  headerForTables:string[];

  //itens of component
  listOfItens:string[];


}
