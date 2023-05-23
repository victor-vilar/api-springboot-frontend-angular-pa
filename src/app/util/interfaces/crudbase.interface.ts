import { Component, Inject, OnInit } from '@angular/core';



/**
 * Component base for the crud components. It has the basic properties to do all the need operations of the project
 */
export interface CrudBaseComponent extends OnInit {

  //component that is going to be manipulated
   title:string;
   //path for applications
   pathPrefix:string;
  // am i gonna need it ?
   pathToOperations:any;
  //headers for the iten-table  table view
   headerForTables:any;

}
