import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
//esta libreria es necesaria para la reactividad
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //constructor() { }
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]) //instanciamos, asignamos tipo de dato (array de Product), y asignamos valor inicial (array en vacio)

  //definiremos un observable, todos los observables tienen un $ al final
  myCart$ = this.myCart.asObservable() //lo que haremos con esto es poder transmitir cambios a otros componentes

  addProduct(product: Product){
    this.myShoppingCart.push(product)
    //la informacion se transmite a todos los que esten suscritos
    this.myCart.next(this.myShoppingCart) //con esto transmitimos el array de myshoppincart
  }
  getShoppingCart(){
    return this.myShoppingCart //esto lo hacemos para desde products no acceder directamente al valor de myShoppingCart si no a traves de este metodo get para asi tener el myshoppingcart como privado
  }
  getShoppingTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}
