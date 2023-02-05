import { FindFullAddressService } from './../../services/find-full-address.service';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/Address';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private findCep:FindFullAddressService) { }

  ngOnInit(): void {
  }



}
