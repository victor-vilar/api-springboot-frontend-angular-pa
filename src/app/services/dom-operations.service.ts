import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomOperationsService {

  constructor() { }

  createsLabel(innerText:string):HTMLLabelElement{
    let label:HTMLLabelElement = document.createElement('label');
    label.innerText = innerText;
    return label;
  }

  createsDiv():HTMLDivElement{
    let div:HTMLDivElement = document.createElement('div');
    return div;
  }

  createsSpan(innerText:string,):HTMLSpanElement{
    let span:HTMLSpanElement = document.createElement('span');
    span.innerText = innerText;
    return span;
  }

  addChilds(fatherElement:HTMLDivElement, ...objects:HTMLElement[]){
    objects.forEach(e => fatherElement.appendChild(e));
  }

}
