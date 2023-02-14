import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {


  @Input()
  cpfCnpj;
  @Input()
  nameCompanyName
  @Input()
  item
  @Input()
  itemSize


  constructor() { }

  ngOnInit(): void {
  }

}
