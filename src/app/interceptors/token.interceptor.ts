import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService : TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request) //aqui guardamos en request el resultado de nuestra funcion addToken (si hay token en LS entonces retorna con header y token, si no, retorna la llamada a la api original)
    return next.handle(request); //aqui enviamos a la api la llamada ya interceptada
  }

  private addToken(request: HttpRequest<unknown>){
    const token = this.tokenService.getToken() //aqui obtenemos el token desde tokenService
    if (token){ //si el token se encuentra guardado en localStorage entonces clonamos la peticion agregandole en el header el token y asi enviamos el clon al servidor llegando allá con token en el header
     const authReq =  request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return authReq
    }
    return request
  }
}
