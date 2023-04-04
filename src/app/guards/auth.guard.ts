import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
    // const token = this.tokenService.getToken()
    // if (token){ //si existe token entonces permitimos que entre
    //   return true
    // }else   //!Ya no preguntamos por el token ya que podemos preguntar por el estado del usuario al authService
    // return false
    // this.router.navigate(['/home']) //redireccionamos a home cuando no existe token
    // }

      //aqui es donde establecemos nuestra condicion de acceso para el guardian a las rutas donde lo llamamos

      return this.authService.user$
        .pipe(
          map(user => {
            if(!user){ //?Esto es llamar al estado, lo podemos hacer desde cualquier componente y asi saber si esta alguien logueado o no
              this.router.navigate(['/home'])
              return false
            }
            return true
          })
        )
    }
}


