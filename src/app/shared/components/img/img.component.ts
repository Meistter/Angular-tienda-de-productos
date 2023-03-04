import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
//el eventEmitter lo usaremos para enviar informacion al padre
@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy{

  constructor(){
    //se ejecuta antes del render
    //no debemos poner funciones asincronas
    // console.log('constructor', 'imgValue =>', this.img);

  }
  ngOnChanges(changes: SimpleChanges){
    //corre antes y durante el render
    //verifica los cambios en los INPUTS (verifica si cambian o se ejecutan)
    // console.log('ngOnChanges', 'imgValue =>', this.img);
    console.log(); //console.log('cambios/changes', changes);

    //aqui se escuchan todos los cambios de todos los inputs pero si queremos uno especifico debemos convertir el input en un setInput

  }
  ngOnInit(): void{
    //before render
    //corre 1 sola vez
    //aqui si podemos llamar cosas asincronas
    // console.log('ngOnInit', 'imgValue =>', this.img);
    this.counterFn = window.setInterval(()=>{ //guardamos el setInterval en una variable para luego poder destruirlo
      this.counter ++;
    },1000)
  }
  ngAfterViewInit(){
    //corre despues del render
    console.log(); //console.log('ngAfterViewInit');
  }
  ngOnDestroy(){
    //al eliminar el componente
    console.log('OnDestroy');

    window.clearInterval(this.counterFn) //con esto mandamos a destruir el setInterval cuando eliminemos el componente de la vista

  }
  img = ''
  //este input lo transformaremos en un setInput para cuando leamos sus cambios en el onChange sepamos que se trata de este input
 // eslint-disable-next-line @angular-eslint/no-input-rename
 @Input('img') set changeImg(newImg: string){ //el 'img' representa el nombre con el que queremos que el input vaya hacia el html
  this.img = newImg


 }
 @Input() alt = ''
 //@Input() img: string = 'valor inicial' //con esto estamos recibiendo el valor desde el padre (app.component.html), el valor definido aqui por el hijo es ignorado
 @Input() width = ''
 @Output() loaded = new EventEmitter<string>() //con el  <string> definimos que se emitirán strings

 counter = 0
 counterFn: number | undefined
 imgDefault = 'https://www.m2crowd.com/core/i/placeholder.png'

 imgError(){
  this.img = this.imgDefault
 }

 imgLoaded(){

  this.loaded.emit(this.img) //entre parentesis mandamos la información a transmitir

 }


}
