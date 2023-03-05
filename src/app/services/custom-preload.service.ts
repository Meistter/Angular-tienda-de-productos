import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService {

  constructor() { }
//en este servicio vamos a definir nuestras reglas de negocio para le precarga de modulos
//esto nos servira para cargar home y category sin cargar admin(cms)
  preload(route: Route, load: ()=>Observable<any>): Observable<any>{
      if (route.data && route.data['preload']) { //va a cargar solo los modulos que tengan preload como true en el app-routing.module.ts
        return load()
      }
      return of(null)
  }

}
