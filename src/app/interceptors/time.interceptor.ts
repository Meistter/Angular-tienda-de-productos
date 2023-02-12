import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,  //Agregaremos contexto a los interceptores
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHECK_TIME = new HttpContextToken<boolean>(()=> false)

export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true) //estos contextos los agregamos para no siempre ejecutar el interceptor si no dependiendo de si ordenamos o no (con la variable booleana) ejecutarlo o no
}
@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)){
      const start = performance.now() //este es un interceptor para ver el tiempo de las solicitudes al servidor
      return next
      .handle(request)
      .pipe(
        tap(() => {
          const time = (performance.now() - start) + 'ms' //calculo para saber cuanto demoró la solicitud
          console.log(request.url, time);

        })
      )
    }
  return next.handle(request)
  }
}
