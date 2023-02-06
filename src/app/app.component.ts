import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private renderer:Renderer2){};

  @ViewChild('menu') menuContainer?:ElementRef;
  @ViewChild('main') mainContainer?:ElementRef;
  menuSmall = false;


  //template functions
  toggling(){
    if(this.menuSmall){
      this.menuContainer?.nativeElement.classList.remove('menu');
      this.menuContainer?.nativeElement.classList.add('menu-small');
      //this.renderer.setStyle(this.mainContainer,'display','hidden');
    }else{
      this.menuContainer?.nativeElement.classList.add('menu');
      this.menuContainer?.nativeElement.classList.remove('menu-small');
      //this.renderer.removeStyle(this.mainContainer,'display');
    }

    this.menuSmall = !this.menuSmall;
  }

  closeFromMenu(option:boolean){
    this.menuSmall = option;
    this.toggling();
  }

}
