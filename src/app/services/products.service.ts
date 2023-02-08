import { Injectable } from '@angular/core';
//este otro modulo tambien es el que nos permite hacer solicitudes a la Api
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry } from 'rxjs/operators';

import { environment } from 'src/environments/enviroment';
//aqui no importamos el enviroment.prod porq angular sabe cuando estamos en produccion usa el correspondiente si no usa el de desarrollo (el normal)
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API = `${environment.API}/api/products` //la url de la api fue establecida en el PROXY | tambien definimos la variable API en el ambiente de produccion para que tenga la URL de la API
  constructor(private http: HttpClient) { }

  getProducts(limit?: number, offset?: number){

    //aqui crearemos parametros opcionales de forma que podemos usar este metodo para cargar todos los productos
    //o para cargar paginando dependiendo si mandamos o no los parametros
    //pero algo no funciona
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    //nosotros estamos manejando los productos basados en un modelo que hicimos, por lo tanto para no tener errores
    //debemos indicarle a la peticion que lo que va a obtener es un array de tipo Product, y lo hacemos asi:
    // <Product[]>
    return this.http.get<Product[]>(this.API, { params }).pipe(retry(3)) //el pipe nos permite implementar retry para reintentar el get en caso que falle
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.API}/${id}`)
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.API}`,{
      params: {limit, offset}
    }).pipe(retry(3))
  }

  create(data: CreateProductDTO){
    return this.http.post<Product>(this.API, data) //data representa a los datos enviados por el body a la api
  } //la solicitud post es de tipo producto ya que cuando hacemos post la api nos retorna el objeto ya grabado, y lo que nos retorna es similar a un get, entonces viene bajo el modelo Producto

  update(id: string, data: UpdateProductDTO){
    return this.http.put<Product>(`${this.API}/${id}`, data)
  }

  delete(id: string){
    //esta api al eliminar no devuelve el producto que elimino si no un booleano diciendo si lo elimino o no
    //por esto usamos boolean en lugar de Product
    return this.http.delete<boolean>(`${this.API}/${id}`)
  }
}
