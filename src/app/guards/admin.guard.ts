import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})


//!Este guardian nos permitira permitir el ingreso al panel administrador solo a usuarios logueados que tengan de rol 'admin' !!!!
//!El resto es redirigido al home, recordar que en el app-router le definimos a la ruta /admin el uso de este guardian y ingresaran las personas dependiendo si este
//!Retorna true o false

export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.user$
      .pipe(
        map(user => {
          if(user?.role ==='admin'){
            return true
          }
          this.router.navigate(['/home'])
          return false
        })
      )
  }

}
