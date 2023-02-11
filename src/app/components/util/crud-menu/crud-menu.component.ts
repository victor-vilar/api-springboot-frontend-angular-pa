import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crud-menu',
  templateUrl: './crud-menu.component.html',
  styleUrls: ['./crud-menu.component.css']
})
export class CrudMenuComponent implements OnInit {


  //links that have the routes to operations.
  @Input()
  linksListForOperations:any[] = []

  constructor() { }
  ngOnInit(): void {
  }


}
