import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Input()
  fatherUrl


  constructor(private router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  backToLastPage(){
    this.router.navigate(['./','clientes'])
  }

}
