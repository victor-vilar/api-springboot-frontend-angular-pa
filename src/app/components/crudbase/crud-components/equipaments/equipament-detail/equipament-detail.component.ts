import { Equipament } from '../../../../../model/Equipament';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-equipament-new',
  templateUrl: './equipament-detail.component.html',
  styleUrls: ['./equipament-detail.component.css']
})
export class EquipamentDetailComponent implements OnInit {

  @ViewChild('singInForm') form:NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  @Output() objectSender = new EventEmitter<Equipament>()

  sendDataToSave(){
    let equipament = {
      id:0,
      equipamentName:this.form.value.equipamentName,
      sizeInMeterCubic:this.form.value.equipamentSize
    }
    console.log(equipament);
    this.objectSender.emit(equipament);
  }
}
