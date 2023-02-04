import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  closeMenuFromFatherEmitter:EventEmitter<boolean> = new EventEmitter<boolean>();

  closeMenuFromFather(){
    this.closeMenuFromFatherEmitter.emit(true);
  }

}
