import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  myShoppingCart: Product[] = [];
  //aqui agregaremos el servicio storedproducts
  //para poder hacer uso del servicio ProductsService lo debemos inyectar aqui en el constructor
  constructor(private storeService: StoreService, private producService: ProductsService){ //lo que hicimos fue inyectar el servicio, para poder usarlo mas abajo
    this.myShoppingCart = this.storeService.getShoppingCart()
    //a diferencia del ShoppingCart el consumo de api es asyncrono por lo q no lo podemos poner en el constructor
    //por esto entonces lo ponemos en el ngOnInit()
  }


  ngOnInit(): void{
    this.producService.getAllProducts().subscribe(data => {this.products = data})
  }
  products: Product []= []
  today = new Date()
  date2 = new Date(2020, 1, 11)
  montoTotal = 0

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product) //aqui en lugar de hacer la logica para añadir el producto estamos usando un servicio que nos añade la lógica necesaria
    this.montoTotal = this.storeService.getShoppingTotal() //de esta forma modularizamos y reutilizamos codigo mucho mejor



  }

}
