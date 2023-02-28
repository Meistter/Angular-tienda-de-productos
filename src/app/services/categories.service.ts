import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API = `${environment.API}/api/categories` //la url de la api fue establecida en el PROXY | tambien definimos la variable API en el ambiente de produccion para que tenga la URL de la API
  constructor(private http: HttpClient) { }

  getAll(limit?: number, offset?: number){
    let params= new HttpParams()
    if (limit && offset){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Category[]>(this.API, {params})
  }
}
