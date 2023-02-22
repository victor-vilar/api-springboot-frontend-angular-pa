import { NgForm } from "@angular/forms";

export interface FormDetail{

  //form that gonna be used on view
  form:NgForm;


  //id of the item that gonna be edited if the form is on edit mode
  idOfEditedItem:number | string;

  //operation that gonna be executed.
  //save new = post
  //save edit = put
  crudOperation:string;


  //methods

  //creates object that this detail form going to manipulate
  createObject():any;

  //save method,
  save(object:any):void;

  //method to configure the view if is on edit mode or not
  onLoad():void;

  //close detail component
  destroy():void;




}

