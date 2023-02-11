import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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
}
