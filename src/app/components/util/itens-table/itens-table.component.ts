import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.css']
})
export class ItensTableComponent implements OnInit {

  // Os dados do cabecalho virão do elemento que vai utilizar o componente.
  @Input()
  tableHeaders:string[] = [];

  // Os dados da tabela virão do elemento que vai utiliar o compoennte.
  @Input()
  tableData:string[] = [];

  //model que sera utilizado
  @Input()
  model:string='';

  constructor() { }
  ngOnInit(): void {
  }

}
