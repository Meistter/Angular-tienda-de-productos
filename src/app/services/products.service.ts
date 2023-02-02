import { Injectable } from '@angular/core';
//este otro modulo tambien es el que nos permite hacer solicitudes a la Api
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    //nosotros estamos manejando los productos basados en un modelo que hicimos, por lo tanto para no tener errores
    //debemos indicarle a la peticion que lo que va a obtener es un array de tipo Product, y lo hacemos asi:
    // <Product[]>
    return this.http.get<Product[]>('https://fakestoreapi.com/products')
  }
}
