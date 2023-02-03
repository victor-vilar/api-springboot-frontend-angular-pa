import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private renderer:Renderer2){};

  @ViewChild('menu') menuContainer?:ElementRef;
  menuSmall = false;



  //template functions
  toggling(){
    console.log(this.menuSmall);
    if(this.menuSmall){
      this.menuContainer?.nativeElement.classList.remove('menu')
      this.menuContainer?.nativeElement.classList.add('menu-small')
    }else{
      this.menuContainer?.nativeElement.classList.add('menu')
      this.menuContainer?.nativeElement.classList.remove('menu-small')
    }
    this.menuSmall = !this.menuSmall;
  }
}
