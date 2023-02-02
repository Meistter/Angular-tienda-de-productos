import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: ''
  }
  @Output() addedProduct = new EventEmitter<Product>(); //Product representa el timpo de informacion a transmitir
  onAddToCart(){
    this.addedProduct.emit(this.product) //le enviamos al padre el producto a ser añadido al carrito
  }

}
