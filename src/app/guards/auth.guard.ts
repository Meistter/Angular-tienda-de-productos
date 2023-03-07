import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
    const token = this.tokenService.getToken()
    if (token){ //si existe token entonces permitimos que entre
      return true
    }else
    return false
    this.router.navigate(['/home']) //redireccionamos a home cuando no existe token
    }

      //aqui es donde establecemos nuestra condicion de acceso para el guardian a las rutas donde lo llamamos
}


