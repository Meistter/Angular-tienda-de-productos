import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ImgComponent } from '../shared/components/img/img.component';
import { RouterModule } from '@angular/router';

//Esto es un modulo compartido, lo usamos para establecer todos los componentes, pipes, assets y modulos que compartiremos entre las dos apps, website y admin

//Esto es PROGRAMACION MODULAR
@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent
  ]
})
export class SharedModule { }
