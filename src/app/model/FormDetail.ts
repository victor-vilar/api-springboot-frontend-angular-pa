import { NgForm } from "@angular/forms";

export interface FormDetail{

  //form that gonna be used on view
  form:NgForm;

  //api route to crud
  rota:string;

  //id of the item that gonna be edited if the form is on edit mode
  idOfEditedItem:number | string;

  //operation that gonna be executed,
  crudOperation:string;


  //methods
  //save on api
  mountObject():any;
  save(object:any):void;
  onLoad():void;
  //close detail component
  destroy():void;




}

