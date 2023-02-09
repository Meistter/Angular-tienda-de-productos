import { Injectable } from '@angular/core';
//este otro modulo tambien es el que nos permite hacer solicitudes a la Api
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
//el operador map lo usamos para poder transformar los valores que nos llegan de la api

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
    return this.http.get<Product[]>(this.API, { params }).pipe(retry(3))


  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.API}/${id}`)
    .pipe(catchError((error: HttpErrorResponse) =>{
      if (error.status === HttpStatusCode.NotFound){ //con HttpStatusCode podemos definir errores de forma mas amigable sin escribir error 404, 500 etc
        return throwError('No encontrado')
      }
      if (error.status === HttpStatusCode.Unauthorized){ //al usar errores asi con mensjaes especificos se muestra mucho mejor al usuario cuando desde el componente validamos en caso de error y mostramos el error recibido, ya que el error llega es en forma del mensaje que definimos aqui
        return throwError('No autorizado')
      }
      return throwError('Ups')
    })
    )
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.API}`,{
      params: {limit, offset}
    }).pipe(retry(3),//el pipe nos permite implementar retry para reintentar el get en caso que falle
    map(products => products.map(item => { //la funcion map la importamos del rxjs pero la map interna es nativa de javascript, aqui lo que estamos es manipulando los datos que recibimos para sacar un nuevo dato calculado
      return {...item, taxes: .19 * item.price} //tomamos taxes y le asignamos item.price operandolo
    }))
    )
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
