import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

    @HostListener('mouseenter') onMouseEnter(){
      this.element.nativeElement.style.backgroundColor = 'purple'
    }
    @HostListener('mouseleave') onMouseLeave(){
      this.element.nativeElement.style.backgroundColor = 'white'
    }
  constructor(private element: ElementRef) {

    this.element.nativeElement.style.backgroundColor = 'blue' //aqui lo que hacemos es cambiarle el fondo al elemento en el que llamemos la directiva
  }
  //las directivas se usan para modificar el dom y los atributos de forma directa, como haciamos en javascript
  //manipulamos con innerHTML, selects y eso
}
