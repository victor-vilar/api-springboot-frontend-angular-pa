import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-menu',
  templateUrl: './crud-menu.component.html',
  styleUrls: ['./crud-menu.component.css']
})
export class CrudMenuComponent implements OnInit {

/*o componente recebera a lista dos links que devo colocar nos links <a>
  para conseguir realizar as operações */
  @Input()
  linksListForOperations = []


  constructor() { }
  ngOnInit(): void {
  }

}
